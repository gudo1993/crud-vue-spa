@extends('templates.master')

@section('router-view')
    <router-view :key="$route.path"></router-view>
@endsection
