<?php

namespace App\Http\Middleware;

use Closure;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!auth()->check()) {
            abort(403);
        }

        if (!auth()->user()->hasRole('admin')) {
            abort(403);
        }

        return $next($request);
    }
}
