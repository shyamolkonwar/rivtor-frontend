import { NextRequest, NextResponse } from 'next/server';
import { rateLimiters } from '@/lib/rate-limit';
import { submitApplication } from '@/lib/db';

/**
 * POST /api/submit-application
 *
 * Submit a new design partner application
 *
 * Rate limit: 3 submissions per hour per IP
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimiters.applicationSubmit.check(
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'
    );

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many submissions',
          message: 'You can only submit 3 applications per hour',
          retryAfter: rateLimitResult.reset,
        },
        {
          status: 429,
          headers: {
            'Retry-After': rateLimitResult.reset.toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate required fields
    if (!body.applicant || !body.application) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Missing applicant or application data' },
        { status: 400 }
      );
    }

    // Validate applicant data
    const { applicant, application } = body;

    if (!applicant.full_name || !applicant.email) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Applicant name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicant.email)) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Submit application
    const result = await submitApplication({
      applicant: {
        full_name: applicant.full_name,
        email: applicant.email,
        company_name: applicant.company_name,
        website: applicant.website,
      },
      application: {
        stage: application.stage || null,
        users_count: application.users_count || null,
        actively_building: application.actively_building ?? null,
        urgency: application.urgency || null,
        biggest_problem: application.biggest_problem || null,
        problem_area: application.problem_area || null,
        attempted_solutions: application.attempted_solutions || null,
        consequence_if_unsolved: application.consequence_if_unsolved || null,
        desired_outcome: application.desired_outcome || null,
        success_7_14_days: application.success_7_14_days || null,
        willing_to_collaborate: application.willing_to_collaborate ?? null,
        can_provide_access: application.can_provide_access ?? null,
        reason_for_rivtor: application.reason_for_rivtor || null,
        payment_intent: application.payment_intent || null,
        execution_gap: application.execution_gap || null,
        intent_type: application.intent_type || null,
      },
    });

    // Return success response with rate limit headers
    return NextResponse.json(
      {
        success: true,
        data: {
          applicationId: result.applicationId,
          score: result.score,
          priority: result.priority,
          status: result.status,
          autoReject: result.autoReject,
        },
      },
      {
        status: 201,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Application submission error:', error);

    // Handle specific error types
    if (error instanceof Error) {
      // Duplicate email error (Postgres unique constraint)
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: 'Duplicate application', message: 'This email has already submitted an application' },
          { status: 409 }
        );
      }

      // Validation errors
      if (error.message.includes('validation') || error.message.includes('invalid')) {
        return NextResponse.json(
          { error: 'Validation error', message: error.message },
          { status: 400 }
        );
      }
    }

    // Generic error response
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: 'An error occurred while submitting your application. Please try again.',
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/submit-application
 *
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
