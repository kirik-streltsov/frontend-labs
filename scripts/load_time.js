(function load_time() {
    var before_loadtime = new Date().getTime();
    document.addEventListener('DOMContentLoaded', () => {
        var aftr_loadtime = new Date().getTime();
        pgloadtime = (aftr_loadtime - before_loadtime) / 1000;
    
        document.getElementById("load_time").innerHTML = "Page load time is <b>" + pgloadtime + "</b> Seconds";
    })
}());