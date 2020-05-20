$(function () {

  function buildMessage(message) {
    if (message.image) {
      var html =
        `<div class="message-list__box" data-message-id=${message.id}>
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
        `<div class="message-list__box" data-message-id=${message.id}>
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
  var reloadMessages = function () {
    var last_message_id = $('.message-list__box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        if (messages.length !== 0) {
          var insertHTML = '';
          $.each(messages, function (i, message) {
            insertHTML += buildMessage(message)
          });
          $('.message-list').append(insertHTML);
          $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight });
        }
      })
      .fail(function () {
        alert('error');
      });
  };

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

  });
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
