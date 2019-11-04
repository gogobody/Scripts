var curr = "com.taobao.taobao";
var home = "com.taobao.tao.TBMainActivity";
var act = "android.widget.FrameLayout";
var view = "android.view.View";
var btn = "android.widget.Button";
var c_className = act;
var c_depth = 11;
var c_indexInParent = 1;
var c_btn = btn;
var c_btn_depth = 18;
var c_btn_indexInParent = 5;

auto.waitFor();

console.show();
function wait(limit) {
    log("状态：预计完成任务需：" + limit + "s");
    while (true) {
        sleep(2000);
        limit -= 2;
        var condition = false;
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i].exists()) {
                condition = true;
                break;
            }
        }
        log("状态：活动耗时2s，预计还需" + limit + "s");
        if (limit <= 0 || condition) {
            break;
        }
    }
}

function timeout(time, active, tip) {
    return threads.start(function() {
        var id = setInterval(function() {
            if (currentActivity() == active) {
                log("等待超时，" + tip);
                notify();
            } else {
                clearInterval(id);
            }
        }, time);
    });
}

function toFind(cls, depth, desc, indexInParent, clickable) {
    var obj = className(cls);
    if (depth != "") {
        obj = obj.depth(depth);
    }
    if (desc != "") {
        obj = obj.descContains(desc);
    }
    if (indexInParent != "") {
        obj = obj.indexInParent(indexInParent);
    }
    if (clickable != "") {
        obj = obj.clickable(clickable);
    }
    return obj;
}

wait(20, toFind(view, "", "滑动浏览得", "", ""))
var subThread = timeout(8000, currentActivity(), "请查找{双11合伙人}重新进入活动");
swipe(device.width / 2, 4*device.height/5, device.width / 2, device.height/5,1000);
subThread.interrupt();

swipe(device.width / 2, 4*device.height/5, device.width / 2, device.height/5,1000);
log("get")