<?php

namespace App\Http\Middleware;

use Closure;

class BeforeLanguagePrefix
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(!app()->runningInConsole()) {
            $user = auth()->user();

            if (isset($user->language)) {
                $locale = $user->language;
            } else {
                // Get language from url or headers
                $segment = request()->header('Language');
                $locale = $segment ? $segment : $request->segment(1);
            }

            // Set current locale
            app()->setLocale($locale);
        }

        return $next($request);
    }
}
