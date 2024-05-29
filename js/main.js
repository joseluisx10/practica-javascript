$(document).ready(function () {
  $('.bxslider').bxSlider({
    auto: true,
    mode: 'fade',
    speed: 500,
    captions: true,
    slideWidth: 1200
  });

  $('[title = "index"]').addClass('active');

  var posts = [
    {
      title: 'Prueba de titulo 1',
      date: `Publicado el dia ${moment().date()} de ${moment().format("MMMM")} del ${moment().format("YYYY")}`,
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae magni sunt maiores magn drfgggdgggggggggggg ffs '
    },
    {
      title: 'Prueba de titulo 2',
      date: `Publicado el dia ${moment().date()} de ${moment().format("MMMM")} del ${moment().format("YYYY")}`,
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae magni sunt maiores magn drfgggdgggggggggggg ffs '
    },
    {
      title: 'Prueba de titulo 3',
      date: `Publicado el dia ${moment().date()} de ${moment().format("MMMM")} del ${moment().format("YYYY")}`,
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae magni sunt maiores magn drfgggdgggggggggggg ffs '
    },
    {
      title: 'Prueba de titulo 4',
      date: `Publicado el dia ${moment().date()} de ${moment().format("MMMM")} del ${moment().format("YYYY")}`,
      content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae magni sunt maiores magn drfgggdgggggggggggg ffs '
    },
  ]

  posts.forEach((item, index) => {
    var post = `
    <article class="post">
                    <h2>${item.title}</h2>
                    <span class="date">${item.date}</span>
                    <p>${item.content}</p>
                    <a href="#" class="button-more">Leer más</a>
                </article>`;
    $("#posts").append(post);
  })

  //Theme
  var theme = $("#theme");
  $("#to-green").click(() => {
    theme.attr("href", "css/green.css");
    localStorage.setItem('theme', theme.attr("href"));
  })
  $("#to-red").click(() => {
    theme.attr("href", "css/red.css")
    localStorage.setItem('theme', theme.attr("href"));
  })
  $("#to-blue").click(() => {
    theme.attr("href", "css/blue.css")
    localStorage.setItem('theme', theme.attr("href"));
  })

  var theme_storage = localStorage.getItem("theme");

  if (theme_storage != null && theme_storage != "undefined") {
    theme.attr("href", theme_storage);
  } else {
    theme.attr("href", "css/green.css");
  }

  //Scroll arriba de la web
  $(".subir").click((e) => {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 500);
    return false;
  });

  //Login
  $("#login form").submit(() => {
    var form_name = $("#form_name").val();
    console.log(form_name)
    localStorage.setItem("form_name", form_name);
    //var fechaExpiracion = moment().add(1, 'months');
    var fechaExpiracion = moment().add(1, 'minutes');
    localStorage.setItem("fechaExpiracion", fechaExpiracion.toISOString())
  })

  var form_name = localStorage.getItem("form_name");

  if (form_name != null && form_name != "undefined") {
    var about_parrafo = $("#about p");
    about_parrafo.html("<br><strong>Bienvenido, " + form_name + "</strong");
    about_parrafo.append("<br><a id='logout' href='#' id='logout'>Salir</a>");
    $("#login").hide();
    $("#logout").click(() => {
      localStorage.removeItem("form_name");
      localStorage.removeItem("fechaExpiracion");
      location.reload();
    });
  }

  //Ciclo de vida 

  var fechaExpiracion = localStorage.getItem("fechaExpiracion")

  if (fechaExpiracion) {

    fechaExpiracion = moment(fechaExpiracion)

    // Compara la fecha de expiración con la fecha actual
    if (fechaExpiracion.isAfter(moment())) {
      // Los datos aún son válidos, puedes usar datos.valor
      console.log('Datos válidos:', fechaExpiracion._d);
    } else {
      // Los datos han caducado, debes eliminarlos
      localStorage.removeItem("form_name");
      localStorage.removeItem("fechaExpiracion");
      console.log('Los datos han caducado y han sido eliminados.');
      location.reload();
    }
  } else {
    console.log('No hay datos almacenados.');
  }
})
