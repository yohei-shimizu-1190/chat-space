$(function () {
  function buildMessage(message) {
    if (message.image) {
      var html =
        `<div class="message-list__box">
          <div class="message-list__box--top">
            <div class="message-list__box--top--name">
              ${message.user_name}
            </div>
            <div class="message-list__box--top--date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__box--bottom">
            <div class="content">
              ${message.content}
              <div class="image">
                <img class="lower-message__image" src="${message.image}">
              </div>
            </div>            
          </div>
        </div>`
      return html;
    } else {
      var html =
        `<div class="message-list__box">
          <div class="message-list__box--top">
            <div class="message-list__box--top--name">
              ${message.user_name}
            </div>
            <div class="message-list__box--top--date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-list__box--bottom">
            <div class="content">
              ${message.content}
            </div>
          </div>
        </div>`
      return html;
    };
  }



  $('#new_message').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
        var html = buildMessage(message);
        $(".message-list").append(html)
        $(".message-list").animate({ scrollTop: $('.message-list')[0].scrollHeight });
        $("form")[0].reset();
        $(".form__box--right-content").prop("disabled", false);
      })
      .fail(function () {
        alert("メッセージ送信に失敗しました");
      })
  })
});
