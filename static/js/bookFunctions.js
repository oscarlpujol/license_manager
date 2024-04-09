// function addBook(){
//     AQUI HABRÍA QUE COGER EL NÚMERO DEL ÚLTIMO VALOR DE LA TABLA
//     $('table > tbody').append(`
//         <th><input type="text" name="title_X" required></th>
//         <th><input type="text" name="isbn_X" required></th>
//         <th><input type="number" name="numlic_X" required></th>
//     `)
// }

// Ejemplo sacado de: https://jqueryui.com/autocomplete/#custom-data

// $(function () {
//     $('#searchByName').autocomplete({
//         minLength: 0,
//         source: books,
//         focus: function (event, ui) {
//             $("#searchByName").val(ui.item.name);
//             return false;
//         },
//         select: function (event, ui) {
//             $('#searchByISBN').val(ui.item.isbn);
//             return false;
//         }
//     }).autocomplete("instance")._renderItem = function (ul, item) {
//         return $("<li>")
//             .append(item.name)
//             .appendTo(ul);
//     };

//     $('#searchByISBN').autocomplete({
//         minLength: 0,
//         source: books,
//         focus: function (event, ui) {
//             $("#searchByISBN").val(ui.item.isbn);
//             return false;
//         },
//         select: function (event, ui) {
//             $('#searchByName').val(ui.item.name);
//             return false;
//         }
//     }).autocomplete("instance")._renderItem = function (ul, item) {
//         return $("<li>")
//             .append(item.isbn)
//             .appendTo(ul);
//     }
// });