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
            ${message.content}
            <img class="lower-message__image" src="${message.image}">
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
            ${message.content}
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
        console.log(message);
        var html = buildMessage(message);
        $(".message-list").append(html)
        $("#message_content").val('')
        $(".form__box--right-content").prop("disabled", false);
      })
      .fail(function () {
        alert("エラー");
      })
  })
});







