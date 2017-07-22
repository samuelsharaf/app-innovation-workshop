
# Run a quick test

Artillery has a quick command which allows you to use it for ad-hoc testing (in a manner similar to ab). Run:

~~
artillery quick --duration 60 --rate 10 -n 20 http://my.app.dev/api/resource
~~
To create 10 virtual users every second for 60 seconds which will send 20 GET requests each.

