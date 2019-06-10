import axios from 'axios'
import marked from 'marked'

/*
 *  author: imricky
 *  time: 2019-06-10 17:23
 *  function: 获取用户信息
*/
async function getUserInfo(_id) {
  try {
    let token = window.localStorage.getItem('jwt_token')
    if (token) {

    }
    let res = await axios({
      url: '/api/user/getInfo',
      method: 'POST',
      data: {
        _id
      }
    })
    return {
      success: true,
      data: res
    }
  } catch (e) {
    return {
      success: true,
      data: res
    }
  } finally {

  }
}


/*
 *  author: imricky
 *  time: 2019-06-10 17:23
 *  function: 把markdown渲染成普通文本
*/
let htmlEscapeToText = (text) => {

  return text.replace(/\&\#[0-9]*;|&amp;/g, function (escapeCode) {

    if (escapeCode.match(/amp/)) {

      return '&'

    }

    return String.fromCharCode(escapeCode.match(/[0-9]+/))

  })

}

// return a custom renderer for marked.
let render_plain = () => {

  var render = new marked.Renderer()

  // render just the text of a link
  render.link = function (href, title, text) {

    return text

  }

  // render just the text of a paragraph
  render.paragraph = function (text) {

    return htmlEscapeToText(text) + '\r\n'

  }

  // render just the text of a heading element, but indecate level
  render.heading = function (text, level) {

    // return level + ' ) ' + text
    return text

  }

  // render nothing for images
  render.image = function (href, title, text) {

    return ''

  }

  render.strong = function (text) {

    return text

  }

  return render

}

export {
  getUserInfo,
  render_plain
}
