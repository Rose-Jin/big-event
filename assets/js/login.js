$("#showReg").click(function () {
  $(".reg-form").show();
  $(".login-form").hide();
});
$("#showLogin").click(function () {
  $(".reg-form").hide();
  $(".login-form").show();
});
let form = layui.form;
form.verify({
  //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
  pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
  repass: function (value, item) {
    let repass = $("#regi_pass").val();
    //value：表单的值、item：表单的DOM对象
    if (value !== repass) {
      return "两次输入密码不一致";
    }

    //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
  },
});
let layer = layui.layer;
$(".reg-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  //   $.ajax({
  //     url: "http://ajax.frontend.itheima.net/api/reguser",
  //     type: "POST",
  //     data,
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("注册失败");
  //       }
  //       layer.msg("注册成功！，即将跳转！");
  //       $("#showLogin").click();
  //     },
  //   });
  axios.post("/api/reguser", data).then((res) => {
    if (res.data.status !== 0) {
      return layer.msg("该账号已被注册");
    }
    layer.msg("注册成功！，即将跳转！");
    $("#showLogin").click();
  });
});
$(".login-form").on("submit", function (e) {
  e.preventDefault();
  let data = $(this).serialize();
  //   $.ajax({
  //     url: "http://ajax.frontend.itheima.net/api/reguser",
  //     type: "POST",
  //     data,
  //     success: function (res) {
  //       if (res.status !== 0) {
  //         return layer.msg("注册失败");
  //       }
  //       layer.msg("注册成功！，即将跳转！");
  //       $("#showLogin").click();
  //     },
  //   });
  axios.post("/api/login", data).then((res) => {
    if (res.data.status !== 0) {
      return layer.msg("登录失败");
      // console.log(res);
    }

    layer.msg("登录成功！，即将跳转", {anim: 5}, function () {
      localStorage.setItem("token", res.data.token);
      location.href = "index.html";
      console.log(res);
    });
  });
});
