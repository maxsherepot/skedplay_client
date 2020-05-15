@php
    $statusesColors = [
        \Modules\Clubs\Entities\Club::STATUS_PENDING => 'bg-secondary',
        \Modules\Clubs\Entities\Club::STATUS_CONNECTED => 'bg-success',
        \Modules\Clubs\Entities\Club::STATUS_REFUSED => 'bg-danger',
        \Modules\Clubs\Entities\Club::STATUS_PROCESSING => 'bg-warning',
    ];
@endphp
<span class="{{ $statusesColors[$status] }} rounded px-2 py-1 text-xs font-bold inline-block text-center">
    @if($time ?? false)
        {{ $time }}
    @else
        {{ \Modules\Clubs\Entities\Club::STATUSES[$status] }}
    @endif
</span>
