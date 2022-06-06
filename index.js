$(function() {
    $('#cardnumber').payment('formatCardNumber');
    $('#cardexpiration').payment('formatCardExpiry');
    $('#cardcvc').payment('formatCardCVC');
    
    $('#cardnumber').keyup(function(event) {
      $('#label-cardnumber').empty().append($(this).val());
    });
    
    $('#cardexpiration').keyup(function(event) {
      var data = $(this).val() + '<span>' + $('#cardcvc').val() + '</span>';
      $('#label-cardexpiration').empty().append(data);
    });
    
    $('#cardcvc').keyup(function(event) {
      var data = $('#cardexpiration').val() + '<span>' + $(this).val() + '</span>';
      $('#label-cardexpiration').empty().append(data);
    });
    
    $('.button-cta').on('click', function () { 
      var proceed = true;
      $(".field input").each(function(){
        $(this).parent().find('path').each(function(){
          $(this).attr('fill', '#dddfe6');
        });
        
        if(!$.trim($(this).val())){
          $(this).parent().find('path').each(function(){
            $(this).attr('fill', '#f1404b');
            proceed = false;
          });
          
          if(!proceed){
            $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
            $(this).parent().find('svg').animate({opacity: '1'}, "slow");
          }
        }
      });
         
      if(proceed) //everything looks good! proceed purchase...
      {
        $('.field').find('path').each(function(){
          $(this).attr('fill', '#3ac569');
        });
        $('.payment').fadeToggle('slow', function() {
          $('.paid').fadeToggle('slow', 'linear');
        });
      }
    });
  });
  
  function myFunction() {
  document.querySelector("body > div.referer-warning").style.display = "none";
  }

const markup = `
  <div id="completed">
    <div class="order" class="checkout">
      <h2>Thank you for your purchase</h2>
      <button class='button-cta' title='Confirm your purchase' id="purchaseBtn" onclick="closeWebview(event)"><span>CLOSE</span></button>
    </div>
  </div>
`;
const page = document.getElementById('checkout');

const closeWebview = (event) => {
  event.preventDefault();
  window.WebviewSdk.close(
    () => console.log("closed webview"),
    e => console.log("failed closing webview", e)
  );
};

function purchase() {
  const requestOptions = {
    method: 'GET',
    mode: 'no-cors',
    redirect: 'follow'
  };
  const params = new URLSearchParams(window.location.search);
  const ticketId = params.get('ticket_id');
  console.log({
    params,
    ticketId
  });

  fetch(`https://b61efe02-95ba-49ad-b2dc-e675ff0bc084.trayapp.io/?ticket_id=${ticketId}&conversation=update`)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error))
  
  page.innerHTML = '';
  page.insertAdjacentHTML('afterbegin', markup);
}