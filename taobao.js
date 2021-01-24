auto();
var i = 1;
var height = device.height;
var width = device.width;
var my_taobao = desc("我的淘宝");
var task_list = text("做任务，领喵币");
var task_listTM = text("去浏览");
var taskList_colse = text("关闭");
var myTrain_door = textContains("我的列车");
var train_number = 0;
var open_button = 0;        //"去参加"任务开关，默认开启,要关闭请自行改成0
var open_button_money = 0;  //"去兑换"任务开关，默认开启,要关闭请自行改成0
var trainTask_button = 1;   //车厢任务开关，默认开启，要关闭请自行改成0

  threads.start(function(){
//开启一个进程，获取向上音量键
//在子线程中调用observeKey()从而使按键事件处理在子线程执行
  events.observeKey();
  events.on("key_down", function(keyCode, events){
//音量键关闭脚本
        if(keyCode == keys.volume_up){
           exit();
                                     }
                                                  });
                          });
                      
  toast("音量上键关闭脚本");
  events.on("exit", function(){
            toast("脚本已结束");}
           );


function appRun() //打开淘宝
{
    var version = device.release;
    toast("分辨率："+width+"*"+height+"\n\n安卓"+version);
    sleep(2000);
    launchApp("手机淘宝");
    toast("打开手机淘宝中...");
    sleep(4000);
}

function randomTime(time1,time2)//产生随机时间
{
    var random_time = random(time1,time2);
    return random_time;
}

function swipeChange_up(move_length,duration,sleep_time) //模拟上滑动
{
    swipe(width / 2 , height/5*2, width / 2,height - move_length,duration); 
    sleep(sleep_time);
}

function swipeChange(move_length,duration,sleep_time) //模拟下滑动
{
    swipe(width / 2 , height - move_length , width / 2,0,duration); 
    sleep(sleep_time);
}

function find_NO1()//找“一号车厢”
{
    while(!text("1号车厢").exists())
    {
        swipeChange(900,1000,0);
    }
}

function train_auto()//车厢内做任务过程
{
    if(desc("签到").exists())
    {
        train_signIn = desc("签到").findOne().parent().parent();
        train_signIn.click();
        sleep(3000);
    }
    log(a)
    var a = 1;
    log(a)
    sleep(4000);
    while(desc("去浏览").exists())
    {
        if(a==1)
        {
            desc("去浏览").findOne().parent().parent().click();
            sleep(4000);
            swipeChange(800,1000,0);
            sleep(20000);
            back();
            sleep(3000);
        }
        else
        {
            log(a)
            desc("去浏览").findOne().parent().parent().click();
            sleep(1500);
            back();
            sleep(2000);
            if(!desc("去浏览").exists())
            {
                break;
            }
        }
        a+=1;
    }
}

function train()//列车任务过程
{
    find_NO1();
    for(i=0;i<20;i++)
    {
        train_number+=3;
        train_name=text(train_number+"号车厢");
        if(train_name.exists())
        {
            sleep(2000);
            train_name.click();
            toast("正在完成"+train_number+"号车厢任务");
            sleep(4000);
            train_auto();
            back();
            train_otherNumber=train_number+3;
            if(!text(train_otherNumber+"号车厢").exists())
            {
                sleep(2000);
                swipeChange_up(380,1000,0);
            }
            if(text(train_otherNumber+"号车厢").clickable()=="false")
            {
                break;
            }
        }
    }
}

function allTrain()//做列车车厢任务总函数
{
    taskList_colse.click();//关闭"领喵币"任务列表
    sleep(2000);
    myTrain_door.click();//打开”我的你车“
    sleep(3000);
    train();
    sleep(3000);
    taskList_colse.click();//关闭”我的列车“
}

function bakcTo_Lisk() //“去浏览”到首页回到任务列表
{
    if(my_taobao.exists())
    {
        getTask();
    }

}

function autoSwipe_Another(button_text) //“去兑换”任务
{
    textContains(button_text).findOne().click();
    sleep(1000);
    toast("完成"+"["+button_text+"]"+"任务");
    sleep(1000);
}

function autoSwipe(button_text) //任务完成过程
{
    while(textContains(button_text).exists())
    {
        toast("第" + (i++) + "个");
        if(button_text=="去观看")
        {
            textContains(button_text).findOne().click();
            sleep(19000);
            back();
            continue;
        }
        if(button_text=="去兑换")
        {
            autoSwipe_Another(button_text);
            continue;
        }
        if(button_text=="去参加")
        {
            var 升级列车 = text("返回");
            升级列车.waitFor();
            sleep(5000);
            升级列车.click();
            continue;
        }
        toast(button_text + "正在进行");
        textContains(button_text).findOne().click();
        swipeChange(500,1000,1000);
        swipeChange(800,1000,2000);
        swipeChange(800,1000,3000);
        swipeChange(1000,1000,4000);
        sleep(randomTime(5000,8000));
        if(desc(" 任务完成").exists())
        {
            sleep(1000);
            back();
            bakcTo_Lisk();
        }
        else
        {
            sleep(4000);
            back();
            bakcTo_Lisk();
        }
        sleep(3000);
    }
    toast("完成"+"["+button_text+"]"+"任务");
    sleep(2500);
}

function autoFinish() //安排每个任务
{
    if(text("签到").exists())
    {
        text("签到").findOne().click();
        sleep(2000);
        toast("签到成功");
        sleep(2000);
    }
    toast("完成[签到]任务");
    sleep(2000);

    if(open_button==1)
    {
        autoSwipe("去参与");
    }
    if(open_button_money==1)
    {
        autoSwipe("去兑换");
    }
    autoSwipe("去浏览");
    autoSwipe("去逛逛");
    autoSwipe("去浏览");
    autoSwipe("去搜索");
    autoSwipe("去观看");
    if(trainTask_button==1)
    {
        sleep(3000);
        toast("开始做列车车厢任务");
        allTrain();//浏览列车任务
        toast("完成列车车厢任务");
    }
    toast("结束");
}

function getTask618() //跳转到任务界面————>任务列表
{   
    className("android.view.View").desc("搜索").clickable(true).findOne().click()
    sleep(200);
    id("searchEdit").setText("理想列车");
    sleep(2000);
    desc("搜索").findOne().click();
    toast("正跳转到任务界面...");
    sleep(5000);
    task_list.waitFor(); //等待“领喵币”按钮出现
    sleep(1500);//缓冲
    toast("正在打开任务列表");
    task_list.click();
    sleep(1500);
}

function getTask_farm(){
    className("android.view.View").desc("搜索").clickable(true).findOne().click()
    sleep(200);
    id("searchEdit").setText("芭芭农场");
    sleep(2000);
    desc("搜索").findOne().click();
    toast("正跳转到任务界面...");
    sleep(1000);
        toast("请手动打开任务列表");//本人不会找按钮，这里需要手动打开任务列表
    task_listTM.waitFor(); //等待打开任务列表
    sleep(1500);//缓冲
    //task_list.click();
    sleep(1500);
    }
    
    function farm_auto()//农场任务
{
        if(text("去签到").exists())
    {
        text("去签到").findOne().click();
        sleep(2000);
        toast("签到成功");
        sleep(2000);
    }
    /*
    if(desc("签到").exists())
    {
        train_signIn = desc("签到").findOne().parent().parent();
        train_signIn.click();
        sleep(3000);
    }*/
        toast("完成[签到]任务");
    sleep(1000);
        liulan("去浏览");
        liulan("去逛逛");
        if (textContains("去领取").exists()){ 
            textContains("去领取").findOne().click()
            sleep(1000);
            //back();
            //continue;
            };
            toast("全部任务完成，其它请手动完成");
            }



    
function liulan(text){
    while (textContains(text).exists()) {   
        toast("第" + (i++) + "个");
        textContains(text).click();
        sleep(4111);
        sml_move(402,1433,587,768,1687);
        sleep(15534);
        back();
        sleep(2000);
    }
}

//计算随机坐标
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 
    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
};

//仿真随机带曲线滑动  
//qx, qy, zx, zy, time 代表起点x,起点y,终点x,终点y,过程耗时单位毫秒
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };

    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy , zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {

        eval("point.push(dx" + i + ")");

    };
    log(point[3].x)

    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]

        xxy.push(xxyy);

    }

    log(xxy);
    gesture.apply(null, xxy);
};


function main() //618任务
{
    appRun();
    getTask618();
    autoFinish();
}
function farm_main() //农场任务
{
    appRun();//此段为自动打开淘宝，因不能打开分身，所以注释掉，需手动打开淘宝！方便运行分身应用！
    toast("等待淘宝启动");
    getTask_farm();
    farm_auto();
    }
var teemor = dialogs.singleChoice("欢迎使用提莫脚本", ["天猫农场", "618开火车",], 0);
toast("选择了第" + (teemor + 1) + "个选项");
if (teemor ==("0")){
    toast("芭芭农场种树");
    device.vibrate(500);
    farm_main();
    };
    if (teemor ==("1")){
    toast("618开火车任务");
    device.vibrate(500);
    main();
    }

exit(); 
