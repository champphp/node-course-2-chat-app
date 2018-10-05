var socket = io();

function scrollToBottom (){
    var message = jQuery('#message');
    var newMessage = message.children('li:last-child')

    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        message.scrollTop(scrollHeight);
    }
}

socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    
    socket.emit('join',params,function(err){
        if(err){
            alert(err);
            window.location.href = '/';
        }else{
            console.log('Not error');
        }
    });
});

socket.on('disconnect', function() {
    console.log('Disconnect from server');
});

socket.on('updataUserList', function(users){
    var ol = jQuery('<ol></ol>');
    users.forEach(user => {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
});

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        text: message.text,
        createAt: formattedTime
    });
    jQuery('#message').append(html); 
    scrollToBottom(); 
});

socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        url: message.url,
        createAt: formattedTime
    });
    jQuery('#message').append(html);
    scrollToBottom();

});

jQuery('#message-from').on('submit',function(e){
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    },function(){
        messageTextbox.val('');
    })
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (){
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.attr('disabled','disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude : position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send location');
        return alert('Unable to fatch location');
    });
});