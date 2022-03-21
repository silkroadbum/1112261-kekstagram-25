import {makeElement} from './util.js';
import {WIDTH_AVATAR, HEIGHT_AVATAR} from './const.js';

const createNewComment = () => {
  const comment = makeElement('li', 'social__comment');
  const avatar = makeElement('img', 'social__picture');
  avatar.style.width = WIDTH_AVATAR;
  avatar.style.height = HEIGHT_AVATAR;
  comment.appendChild(avatar);
  const commentText = makeElement('p', 'social__text');
  comment.appendChild(commentText);
  return comment;
};

const fillCommentsFiled = (array, fragment) => {
  for (let i = 0; i < array.length; i++) {
    const newComment = createNewComment();
    newComment.querySelector('.social__picture').src = array[i].avatar;
    newComment.querySelector('.social__text').textContent = array[i].message;
    fragment.appendChild(newComment);
  }
};

export {fillCommentsFiled};
