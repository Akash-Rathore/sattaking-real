//Logout Script starts
$(document).on('click', '.log_out', function (e) {
    e.preventDefault();
    $.ajax
        ({
            url: 'Login/logout',
            dataType: 'json',
            data: { log_out: true },
            method: 'post',
            success: function (data) {
                window.location.href = data['msg'];
            },
            error: function (data) {
                console.log('Error in Ajax');
            }
        })
});

//logout script ends
//login Script
$(document).on('submit', '.login-form', function (e) {
    e.preventDefault();
    $.ajax
        ({
            url: "Login/login_check",
            method: 'post',
            dataType: 'json',
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (data) {
                if (data['type'] == 'success') {
                    window.location.href = data['msg'];
                } else if (data['type'] == 'error') {
                    swal.fire({
                        'icon': 'error',
                        'title': 'Error',
                        'text': data['msg']
                    });
                }
            },
            error: function (data) {
                swal.fire({
                    'icon': 'error',
                    'title': 'Error',
                    'text': 'Ajax Error'
                });
            }
        });
})
//login scripts ends
//Mobile Check
// To ensure only valid mobile numbers(7000000000 to 9999999999) are entered
$(document).ready(function () {
    $(document).on('keyup', '.js-input-mobile', function (e) {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
        var $input = $(this),
            value = $input.val(),
            length = value.length,
            inputCharacter = parseInt(value.slice(-1));
        if (!((length > 1 && inputCharacter >= 0 && inputCharacter <= 9) || (length === 1 && inputCharacter >= 6 && inputCharacter <= 9))) {
            $input.val(value.substring(0, length - 1));
        }
    });
})
//---------------------------------------------------------------------------------------------------
// all form submit - START
function ajaxStart() {
    $('#loader').show();
}

function ajaxEnd() {
    $('#loader').hide();
}

$(document).on('submit', '.form-submit', function (e) {
    e.preventDefault();
    let form = $(this);
    let type = $(this).attr('data-type');
    let formData = new FormData($(form)[0]);
    ajaxStart();
    $.ajax({
        url: $(form).attr('action'),
        type: 'post',
        dataType: 'json',
        cache: true,
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
            console.log(result);
            if (result.type === 'success') {
                // form reset
                $(`${result.modal_id} .form-submit`).trigger('reset');
                // modal hide
                $(result.modal_id).modal('hide');
                // Data
                if (result.showAll == 'showAll') {
                    // showData('products/showAll','productsTable')
                }
                if (type === 'table-create') {
                    $('.main-table tbody').fadeIn(function () {
                        $('.main-table tbody').prepend(result.data.data);
                    });
                } else if (type === 'table-update') {
                    tr = $(".main-table tbody  tr td button[data-id-for='" + result.data.update_row + "']").parent().parent().remove();
                    $('.main-table tbody').fadeIn(function () {
                        $('.main-table tbody').prepend(result.data.data);
                    });
                }
            }
            if (result.swal) {
                Swal.fire(result.swal);
            }
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
});
// all form submit - END
// Modal Create START
$(document).on('click', '.modal-create', function () {
    let url_create = $(this).attr('data-url') + 'create';
    let target = $(this).attr('data-target');
    let type = $(this).attr('data-type') + '-update';
    $(target + ' form').attr('action', url_create);
    $(target + ' form').attr('data-type', type);
    $(target + ' form').trigger('reset');
    $('form input[type=checkbox]').prop("checked", false);
    $('form input[type=checkbox]').removeAttr("checked");
    $(target + ' textarea').html('');
    let id = $(this).attr('data-id-for');
    $('#satta_type_id').val(id);
});
// Modal Create END
// Modal Update START
$(document).on('click', '.modal-update', function () {
    $('form input[type=checkbox]').prop("checked", false);
    $('form input[type=checkbox]').removeAttr("checked");
    let id = $(this).attr('data-id-for');
    let target = $(this).data('target');
    let url_read = $(this).attr('data-url') + 'read';
    let url_update = $(this).attr('data-update') + '?id=' + id;
    let type = $(this).attr('data-type') + '-update';
    ajaxStart();
    $.ajax({
        url: url_read,
        type: 'post',
        dataType: 'json',
        data: { id },
        success: function (result) {
            if (result.data.data) {
                $.each(result.data.data, function (key, value) {
                    $(`${target} .input[name="${key}"]`).val(value);
                });
            }
            if (result.data.single_select) {
                $.each(result.data.single_select, function (key, value) {
                    $(target + ` select[name=${key}]`).val(value);
                });
            }
            if (result.data.checkbox) {
                $.each(result.data.checkbox, function (key, value) {
                    $(`${target}  input:checkbox[value="${value}"]`).prop('checked', true);
                });
            }
            if (result.data.radio) {
                $.each(result.data.radio, function (key, value) {
                    $(target + ' ' + key).prop('checked', true);
                });
            }
            if (result.data.textarea) {
                $.each(result.data.textarea, function (key, value) {
                    $(`${target} [name="${key}"]`).html(value);
                });
            }
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
    $(target + ' form').attr('data-type', type);
    $(target + ' form').attr('action', url_update);
});
// Modal Update END
// Row Data Delete START
$(document).on('click', '.delete', function (e) {
    e.preventDefault();
    let element = $(this);
    let url = $(this).attr('data-url') + 'delete';
    let id = $(this).attr('data-id-for');
    let type = $(this).attr('data-type');
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.value) {
            ajaxStart();
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: { id },
                success: function (result) {
                    if (result.type === 'success') {
                        let tr = $(element).parent().parent().remove();
                        $(tr).fadeOut(function () {
                            $(tr).remove();
                        });
                    }
                    if (result.swal) {
                        Swal.fire(result.swal);
                    }
                    ajaxEnd();
                },
                error: function (error) {
                    swal.fire({
                        'icon': 'error',
                        'title': 'Error',
                        'text': 'AJAX ERROR'
                    });
                    ajaxEnd();
                }
            });
        }
    });
});
$(document).on('click', '.extra-actions', function (e) {
    id = $(this).attr('data-id');
    url = $(this).attr('data-url');
    ajaxStart();
    $.ajax({
        url: 'Web_services/satta_types/' + url,
        type: 'post',
        dataType: 'json',
        data: { id },
        success: function (result) {
            if (result.type == 'success') {
                $(e.target).removeClass(result.remove_class);
                $(e.target).addClass(result.add_class);
            }
            if (result.swal) {
                Swal.fire(result.swal);
            }
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
})

$(document).on('click', '.getPermissions', function () {
    id = $(this).attr('data-id-for');
    ajaxStart();
    $.ajax({
        url: 'Web_services/users/getPermission',
        type: 'post',
        dataType: 'json',
        data: { id },
        success: function (result) {
            if (result.type == 'success') {
                $('#getPermissions').html(result.data.data);
            }
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
})

function showData(url, table, para1 = null, para2 = null, para3 = null, para4 = null, para5 = null) {
    ajaxStart();
    $.ajax({
        url: 'Web_services/' + url,
        type: 'post',
        dataType: 'json',
        data: { para1, para2, para3, para4, para5 },
        success: function (result) {
            $('#' + table).html(result.data.data);
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
}

$(document).on('click', '.number-filter', function () {
    sattaType = $('#sattaType').val();
    date_from = $('#date_from').val();
    date_to = $('#date_to').val();
    if (sattaType == null && date_from == "" && date_to == "") {
        swal.fire({
            'icon': 'error',
            'title': 'Error',
            'text': 'Please Enter Text  In Filter'
        });
    } else {
        showData('satta_nos/showAll', 'sattaNumberTable', sattaType, date_from, date_to);
    }
})

$(document).on('click', '.view-actions', function (e) {

    id = $(this).attr('data-id');
    url = $(this).attr('data-url');
    ajaxStart();
    $.ajax({
        url: 'Web_services/fixers/' + url,
        type: 'post',
        dataType: 'json',
        data: { id },
        success: function (result) {
            if (result.type == 'success') {
                $(e.target).removeClass(result.remove_class);
                $(e.target).addClass(result.add_class);
            }
            if (result.swal) {
                Swal.fire(result.swal);
            }
            ajaxEnd();
        },
        error: function (error) {
            swal.fire({
                'icon': 'error',
                'title': 'Error',
                'text': 'AJAX ERROR'
            });
            ajaxEnd();
        }
    });
})

function digi() {
    var date = new Date(),
        hour = date.getHours(),
        minute = checkTime(date.getMinutes()),
        ss = checkTime(date.getSeconds());

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    if (hour > 12) {
        hour = hour - 12;
        if (hour == 12) {
            hour = checkTime(hour);
            document.getElementById("tt").innerHTML = hour + ":" + minute + ":" + ss + " AM";
        } else {
            hour = checkTime(hour);
            document.getElementById("tt").innerHTML = hour + ":" + minute + ":" + ss + " PM";
        }
    } else {
        document.getElementById("tt").innerHTML = hour + ":" + minute + ":" + ss + " AM";
        ;
    }
    var time = setTimeout(digi, 1000);
}

$(document).on('click', '.get-not-featured-type', function () {
    let id = $(this).data('id');
    let month = $(this).data('month');
    let year = $(this).data('year');
    $('#not-featured-type .modal-title').html($(this).data('name'));
    $.ajax({
        url: `webservice-public/get_not_featured_type/${id}/${month}/${year}`,
        type: 'get',
        dataType: 'json',
        success: function (res) {
            console.log(res)

            $('#not-featured-type table tbody').html(res.data);
            $('#not-featured-type .modal-footer .row').html(res.prev_next);

        },
        error: function () {
            console.log('AJAX ERROR');
        }
    });
});

$('.autoresizing').on('input', function () {
    // this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});



$(document).ready(function () {
    setTimeout(function() {
        $('#custom-chat').addClass('open');
    }, 8000);
})


$(document).on('click', '#chat-open-mobile, #custom-chat header', function () {
    $('#custom-chat').addClass('open');
    document.getElementById(`last`).scrollIntoView();
});

$(document).on('click', '.close-chat', function () {
    $('#custom-chat').removeClass('open');
});


// set cursor Position - start
function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
}

// set cursor Position - end

// insert another string in defined string by Position - start
insert = function insert(main_string, ins_string, pos) {
    if (typeof (pos) == "undefined") {
        pos = 0;
    }
    if (typeof (ins_string) == "undefined") {
        ins_string = '';
    }
    return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}
// insert another string in defined string by Position - end


$('.textarea-in-pc').bind('keyup', 'shift+return', function () {
    let cursorPosition = $(this).prop("selectionStart");
    let old_value = $(this).val();
    let new_value = insert(old_value, "\n", cursorPosition);
    $(this).val(new_value);
    setCaretToPos(this, cursorPosition + 1);
});

$(document).on('keydown', '.textarea-in-pc', function (e) {
    if (e.keyCode == 13) {
        return false;
    } else {
        return true;
    }
});

$('.textarea-in-pc').bind('keyup', 'return', function () {
    chat_send(this);
});

$(document).on('click', '#send-pc,#send-mobile', function () {
    chat_send($(this).prev());
});


let response_chat = '';
$(document).ready(function () {
    $.ajax({
        url: 'http://sattaking-real.com/api.php',
        type: "POST",
        dataType: 'json',
        data: { "method": "default_response" },
        success: function (res) {
            response_chat = res.data.value;
        },
    });
});


function chat_send(element) {
    let your_msg = $(element).val().trim();
    if (your_msg) {

        let myChat;
        myChat = JSON.parse(localStorage.getItem('myChat'));
        if (myChat == null) {
            myChat = {};
        }
        let max_index = Object.keys(myChat).length + 1;

        your_msg = your_msg.allReplace({ "\n": '<br>' });
        $('#custom-chat .body #last').before(`<div class="sent"><span></span>${your_msg}</div>`);

        document.getElementById('last').scrollIntoView();

        myChat[max_index] = { class: 'sent', msg: your_msg };
        localStorage.setItem('myChat', JSON.stringify(myChat));
        $(element).val('');
        $(element).focus();
        $(element).css('height', '50px');

        $.ajax({
            url: 'Webservice_public/chat_create',
            type: 'post',
            dataType: 'json',
            data: {
                message: your_msg
            }
        });


        if (localStorage.getItem('startChat') === null) {
            setTimeout(function () {
                $('#custom-chat .body #last').before(`<div class="received"><span class="corner"></span>${response_chat}</div>`);
                document.getElementById('last').scrollIntoView();
            }, 1500);

            myChat[max_index + 1] = { class: 'received', msg: response_chat };
            localStorage.setItem('myChat', JSON.stringify(myChat));
            localStorage.setItem('startChat', false);
        }

    }
}


String.prototype.allReplace = function (obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

$(document).ready(function () {
    let myChat = JSON.parse(localStorage.getItem('myChat'));
    // console.log(myChat);
    let fullChat = '';
    for (key in myChat) {
        fullChat += `<div class="${myChat[key]['class']}">${myChat[key]['msg']}</div>`;
    }
    $('#custom-chat .body #last').before(fullChat);
});