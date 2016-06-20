// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require turbolinks
//= require twitter/bootstrap
//= require gtm

$( document ).ready(function() {
  if(window.location.hash) {
      var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character
      if (hash == 'log_in' && $('#log_in').length > 0) {
        $('#log_in').modal('show');
      } else if (hash == 'sign_up' && $('#sign_up').length > 0){
        $('#sign_up').modal('show');
      } else if (hash == 'get_pw' && $('#get_pw').length > 0){
        $('#get_pw').modal('show');
      } else if (hash == 'edit_pw' && $('#edit_pw').length > 0){
        $('#edit_pw').modal('show');
      }
  }
  $.ajaxSetup({
    headers: {
      'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
    }
  });

  var vote_problem, unvote_problem;

  vote_problem = function() {
    // console.log('vote click');
    var id = $(this).data("id")
    var url = '/problems/' + id + '/vote'
    $.ajax({
      type: 'POST',
      url: url,
      data: {
        _method: 'post',
        problem: {
          vote: true
        },
        authenticity_token: window._token
      }
    }).done(function( data ) {
      // console.log( data );
      if (data['status'] == 'success'){
        $('#problem-' + id + '-votes-count').text('+' + data['votes_count']);
        $('#problem-' + id + '-votes-count').addClass('active');
        $('#problem-' + id + '-votes-count').unbind('click');
        $('#problem-' + id + '-votes-count').click(unvote_problem);
        $('#problem-' + id + '-vote').removeClass( "vote" );
        $('#problem-' + id + '-vote').addClass( "active unvote" );
        $('#problem-' + id + '-vote').unbind('click');
        $('#problem-' + id + '-vote').click(unvote_problem);
      } else if (data['voted'] === true) {
        // reset the vote state
        $('#problem-' + id + '-votes-count').text('+' + data['votes_count']);
        $('#problem-' + id + '-votes-count').addClass('active');
        $('#problem-' + id + '-votes-count').unbind('click');
        $('#problem-' + id + '-votes-count').click(unvote_problem);
        $('#problem-' + id + '-vote').removeClass( "vote" );
        $('#problem-' + id + '-vote').addClass( "active unvote" );
        $('#problem-' + id + '-vote').unbind('click');
        $('#problem-' + id + '-vote').click(unvote_problem);
      }
    });

  };
  unvote_problem = function() {
    // console.log('unvote click');
    var id = $(this).data("id")
    var url = '/problems/' + id + '/unvote'
    $.ajax({
      type: 'DELETE',
      url: url,
      data: {
        _method: 'delete',
        problem: {
          vote: false
        },
        authenticity_token: window._token
      }
    }).done(function( data ) {
      // console.log( data );
      if (data['status'] == 'success'){
        $('#problem-' + id + '-votes-count').text('+' + data['votes_count']);
        $('#problem-' + id + '-votes-count').removeClass('active');
        $('#problem-' + id + '-votes-count').unbind('click');
        $('#problem-' + id + '-votes-count').click(vote_problem);
        $('#problem-' + id + '-vote').removeClass( "active unvote" );
        $('#problem-' + id + '-vote').addClass( "vote" );
        $('#problem-' + id + '-vote').unbind('click');
        $('#problem-' + id + '-vote').click(vote_problem);
      } else if (data['voted'] === false) {
        // reset the vote state
        $('#problem-' + id + '-votes-count').text('+' + data['votes_count']);
        $('#problem-' + id + '-votes-count').removeClass('active');
        $('#problem-' + id + '-votes-count').unbind('click');
        $('#problem-' + id + '-votes-count').click(vote_problem);
        $('#problem-' + id + '-vote').removeClass( "active unvote" );
        $('#problem-' + id + '-vote').addClass( "vote" );
        $('#problem-' + id + '-vote').unbind('click');
        $('#problem-' + id + '-vote').click(vote_problem);
      }
    });

  };
  $('.vote').click(vote_problem);
  $('.unvote').click(unvote_problem);
});
