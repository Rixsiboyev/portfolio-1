// ——————————————————————————————————————————————————
// TextScramble
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({
        from,
        to,
        start,
        end
      })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let {
        from,
        to,
        start,
        end,
        char
      } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}

// ——————————————————————————————————————————————————
// Example
// ——————————————————————————————————————————————————

const phrases = [
  'Rixsiboyev Islombek.',
  'Islom Developer.'
]

const el = document.querySelector('.text')
const fx = new TextScramble(el)

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800)
  })
  counter = (counter + 1) % phrases.length
}

next()






$(function () {
  let link = $('nav ul a');
  link.on('click', function (e) {
    e.preventDefault();
    link.removeClass('active2');
    let selector = $(this).addClass("active2").attr('href');
    let target = $(selector);
    $('html, body').animate({
      scrollTop: target.offset().top - 70
    }, 300)
  });
  $('.header-toggle-btn').click(function () {
    $('.navigation-menu').toggleClass("active");
  });
  $(window).on('load', function () {
    $(".loading").fadeOut(1000);
    $(".header").fadeIn(1000);
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      $('.header-nav').css({
        display: 'flex',
        transform: 'translateY(0)'
      });
    } 
    else if ($(this).scrollTop() < 10) {
      $('.header-nav').css({
        display: 'none'
      });
    };
    
    
    
    
    
    
    
    
    let scroll = $(window).scrollTop();
    link.each(function () {
      let selector = $(this).attr('href');
      let target = $(selector);
      if (scroll >= target.offset().top - 200) {
        link.removeClass('active2');
        $(this).addClass('active2');
      }
    })
  });
  link.on('click', function () {
    $('.navigation-menu').removeClass("active");
  });

  
  let train = $('.train img');
  train.on('click', function () {
    $('.train img').css({
      transform: 'translateX(230%)'
    });
  })
 
})