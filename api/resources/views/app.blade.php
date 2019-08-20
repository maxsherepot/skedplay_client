<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Skidplay</title>
</head>

<body>
  <div id="app"></div>

<script src="{{ mix('app.js', 'js/apps/main') }}"></script>
</body>

</html>
