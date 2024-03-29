function addUser() {
    $('table > tbody').append(`<tr>
  <td>
  <input class="form-control" type="text" name="email">
</td>
<td> 
</td>
<td> 
</td>
<td class="text-center">
  <a href="#/" onclick="cancelUser($(this))"><svg class="saveIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg></a>
  &nbsp;<a href="#/" onclick="saveUser($(this))"><svg class="saveIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V173.3c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32H64zm0 96c0-17.7 14.3-32 32-32H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V128zM224 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg></a>
</td>
</tr>
  `);
}

function saveUser(buttonClicked) {
    row = buttonClicked.parent().parent()
    email = $(row).find('input[name="email"]').val();

    if (email == "") {
        alert("El correo del usuario no puede estar vacío.");
        return;
    }

    user = {
        "email": email
    }

    $.ajax({
        method: 'PUT',
        url: '/users',
        contentType: 'application/json',
        data: JSON.stringify(user),
        beforeSend: function() {
            buttonClicked.html('<svg class="grayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>')
        }
    }).done(function(response) {
        if (response['code'] == 0) {
            row[0].id = response['id']
            $(row).html(`
            <td>
              <p class="name">` + user['email'] + `</p>
            </td>
            <td class="text-center">
              <div class="form-check form-switch d-flex justify-content-center">
                <input class="form-check-input isAdmin" type="checkbox" onclick="editUser($(this), 0)">
              </div>
            </td>
            <td class="text-center">
              <a href="#/" class="pass" onclick="restorePass($(this))"><svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z"/></svg></a>
            </td>
            <td class="text-center">
            <a href="/users/` + row[0].id + `/machines"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-monitor"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg></a>
            <a href="#/" onclick="delUser($(this))"><svg class="trashIcon"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                </svg></a>
            </td>
        `);
        } else {
            alert(response['message']);
        }
    })
}

function editUser(buttonClicked, isAdmin, confirmation = false) {
    if (confirmation)
        if (!confirm("¿Deseas retirar los permisos de este usuario?")) {
            checkbox = buttonClicked.parent().parent()
            checkbox.html(`<div class="form-check form-switch d-flex justify-content-center"><input type="checkbox" class=" form-check-input isAdmin" ` + "checked" + ` onclick="editUser($(this), ` + 1 + `, ` + ((1 == 1) ? true : false) + `)"/></div>`)
            return
        }
    checkbox = buttonClicked.parent().parent()
    row = buttonClicked.parent().parent().parent()
    id = row[0].id
    console.log(id)
    $.ajax({
        method: 'POST',
        url: '/users/' + id,
        contentType: 'application/json',
        data: JSON.stringify({ 'admin': isAdmin }),
        beforeSend: function() {
            buttonClicked.html('<svg class="grayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>')
        }
    }).done(function(response) {
        if (response['code'] == 0) {
            checkbox.html(`<div class="form-check form-switch d-flex justify-content-center"><input type="checkbox" class=" form-check-input isAdmin" ` + ((response['isAdmin'] == 1) ? "checked" : "") + ` onclick="editUser($(this), ` + response['isAdmin'] + `, ` + ((response['isAdmin'] == 1) ? true : false) + `)"/></div>`)
        } else {
            alert(response['message'])
        }
    })
}

function changeRole(selectElement) {
    var row = selectElement.closest('tr');
    var id = row.attr('id');
    var newRole = selectElement.val();

    $.ajax({
        method: 'POST',
        url: '/usersRole/' + id,
        contentType: 'application/json',
        data: JSON.stringify({ 'role': newRole }),
        beforeSend: function() {
        }
    }).done(function(response) {
        if (response['code'] == 0) {
            row.find('.role').text(newRole);
        } else {
            alert(response['message']);
        }
    });

}

function restorePass(buttonClicked) {
    row = buttonClicked.parent().parent()
    id = row[0].id
    $.ajax({
        method: 'PATCH',
        url: '/users/' + id,
        contentType: 'application/json',
        beforeSend: function() {
            buttonClicked.html('<svg class="grayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>')
        }
    }).done(function(response) {
        if (response['code'] == 0) {
            buttonClicked.html(`<a href="#/" class="pass" onclick="restorePass($(this))"><svg class="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z"/></svg></a>`)
        } else {
            alert(response['message'])
        }
    })
}

function cancelUser(buttonClicked) {
    row = buttonClicked.parent().parent()
    row.html('')
}

function delUser(buttonClicked, confirmation = false) {
    if (confirmation)
        if (!confirm("¿Deseas borrar este usuario?")) return
    row = buttonClicked.parent().parent()
    id = row[0].id
    $.ajax({
        method: 'DELETE',
        url: '/users/' + id,
        contentType: 'application/json',
        beforeSend: function() {
            buttonClicked.html('<svg class="grayIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zm0 416c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM48 304c26.5 0 48-21.5 48-48s-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48zm464-48c0-26.5-21.5-48-48-48s-48 21.5-48 48s21.5 48 48 48s48-21.5 48-48zM142.9 437c18.7-18.7 18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zm0-294.2c18.7-18.7 18.7-49.1 0-67.9S93.7 56.2 75 75s-18.7 49.1 0 67.9s49.1 18.7 67.9 0zM369.1 437c18.7 18.7 49.1 18.7 67.9 0s18.7-49.1 0-67.9s-49.1-18.7-67.9 0s-18.7 49.1 0 67.9z"/></svg>')
        }
    }).done(function(response) {
        if (response['code'] == 0) {
            row.html('')
        } else {
            buttonClicked.html("Error")
            alert(response['message'])
        }
    })
}