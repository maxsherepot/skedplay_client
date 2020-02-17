@php
    $statusesColors = [
        \Modules\Users\Entities\User::STATUS_AWAITING_CONFIRMATION => 'bg-warning',
        \Modules\Users\Entities\User::STATUS_CONFIRMED => 'bg-success',
        \Modules\Users\Entities\User::STATUS_REFUSED => 'bg-danger',
    ];
@endphp
<span class="{{ $statusesColors[$status] }} rounded px-2 py-1 text-xs font-bold">
    {{ \Modules\Users\Entities\User::STATUSES[$status] }}
</span>
