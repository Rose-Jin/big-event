function getUserInfo() {
  axios
    .get("/my/userinfo", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      // console.log(res);
      let info = res.data.data;
      console.log(info);
      let name = info.nickname || info.username;
      $("#welcome").text("欢迎" + name);
      if (info.user_pic) {
        $(".layui-nav-img").attr("src", info.src_pic).show();
        $(".text-avatar-box").hide();
      } else {
        $(".text-avatar-box").show().children().text(name[0].toUpperCase());
        $(".layui-nav-img").hide();
      }
    });
}
getUserInfo();
// 点击推出登录
$("#btnLogout").click(function () {
  // 询问框
  let layer = layui.layer;
  layer.confirm("是否退出登录?", {icon: 3, title: "提示"}, function (index) {
    //do something
    localStorage.removeItem("token");
    location.href = "login.html";
    layer.close(index);
  });
});
