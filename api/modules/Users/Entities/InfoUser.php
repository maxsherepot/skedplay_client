<?php

namespace Modules\Users\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Jenssegers\Agent\Agent;

class InfoUser extends Model
{

    protected $fillable = ['ip', 'user_agent', 'browser_locale', 'user_id'];

    protected $appends = ['agent'];

    public function user(): BelongsTo
    {
        return $this->BelongsTo(User::class);
    }

    public function getLocaleAttribute()
    {
        $locale = locale_accept_from_http($this->browser_locale);
        return $locale ? $locale : null;
    }

    public function getBrowserAttribute()
    {
        $browser = $this->agent->browser();
        return $browser ? $browser . ' ' . $this->agent->version($browser) : null;
    }

    public function getOperatingSystemAttribute()
    {
        $platform = $this->agent->platform();
        return $platform ? $platform . ' ' . $this->agent->version($platform) : null;
    }

    public function getAgentAttribute()
    {
        return new Agent([], $this->user_agent);
    }
}
