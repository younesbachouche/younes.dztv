function load_m3u8(t) {
    if (Hls.isSupported()) {
        var e = document.getElementById("video"),
            n = new Hls;
        n.loadSource(t), n.attachMedia(e), n.on(Hls.Events.MANIFEST_PARSED, function() {
            e.play()
        })
    } else e.canPlayType("application/vnd.apple.mpegurl") && (e.src = t, e.addEventListener("canplay", function() {
        e.play()
    }));
    $("#text").hide(), $("#video").show()
}

function ajax_process_m3u8(t) {
    var e = t.lastIndexOf("/");
    if (-1 != e) {
        t.substr(0, e + 1);
        var n = t;
        $.ajax({
            type: "GET",
            url: n,
            success: function(t) {
                for (var e = t.trim().split(/\s*[\r\n]+\s*/g), n = e.length, a = 1; a < n; a++) {
                    var o = $.trim(e[a]);
                    if (-1 !== o.indexOf("#EXTINF")) var i = o.match(/^#EXTINF:.*?tvg-name="(.*?)".*?tvg-logo="(.*?)".*?/is),
                        l = i[1],
                        d = i[2];
                    else add_station(l, o, d), 0
                }
            }
        })
    }
}

function add_station(t, e, n) {
    d = document.createElement("div"), $(d).addClass("station").html('<img src="' + n + '" alt="' + t + '" width="128">').appendTo($("#stations")).click(function() {
        load_m3u8(e)
    })
}
