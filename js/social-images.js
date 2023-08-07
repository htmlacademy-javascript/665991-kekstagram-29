import { getData } from './data.js';
import { initPostsFilter } from './posts-filter.js';
import { disableFilter } from './posts-filter.js';
import { isEscape } from './utils.js';

const bigPictureElement = document.querySelector('.big-picture');
const socialCommentsContainer = bigPictureElement.querySelector('.social__comments');
const userCommentElement = bigPictureElement.querySelector('.social__comment');
const socialCommentsCurrentElement = bigPictureElement.querySelector('.comments-current');
const loadMoreCommentsButtonElement = document.querySelector('.social__comments-loader');
const onBigPictureCancelButtonClick = document.querySelector('.big-picture__cancel');
const body = document.body;

const MAX_NUMBER_OF_COMMENTS = 5;

let comments = [];

const renderComments = (partComments) => {
  if (!partComments.length) {
    return;
  }
  const commentFragment = document.createDocumentFragment();

  partComments.forEach((comment) => {
    const commentItem = userCommentElement.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;
    commentItem.querySelector('.social__picture').alt = comment.name;

    commentFragment.append(commentItem);
  });

  socialCommentsContainer.append(commentFragment);
};

const loadComments = () => {
  loadMoreCommentsButtonElement.classList.remove('hidden');
  renderComments(comments.splice(0, MAX_NUMBER_OF_COMMENTS));
  socialCommentsCurrentElement.textContent = document.querySelectorAll('.social__comment').length;
  if (!comments.length) {
    loadMoreCommentsButtonElement.classList.add('hidden');
  }
};

const closeBigPicture = (evt) => {
  if (isEscape(evt)) {
    document.removeEventListener('keydown', closeBigPicture);
    body.classList.remove('modal-open');
    bigPictureElement.classList.add('hidden');
  }
};

const openBigPictureMode = (pic) => {
  const bigPictureSocial = document.querySelector('.big-picture__social');
  const socialCommentCount = document.querySelector('.social__comment-count');
  body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
  bigPictureElement.querySelector('.big-picture__img').querySelector('img').src = pic.url;
  bigPictureSocial.querySelector('.likes-count').textContent = pic.likes;
  socialCommentCount.querySelector('.comments-count').textContent = pic.comments.length;
  bigPictureSocial.querySelector('.social__caption').textContent = pic.description;
  document.addEventListener('keydown', closeBigPicture);
  socialCommentsContainer.innerHTML = '';
  comments = [...pic.comments];
  loadComments();
};

const createUsersPosts = (data) => {
  for (const pic of data) {
    const randomUserPic = document.querySelector('#picture').content.querySelector('.picture');
    const clonUserPic = randomUserPic.cloneNode(true);
    clonUserPic.querySelector('.picture__img').src= pic.url;
    document.querySelector('.pictures').append(clonUserPic);
    clonUserPic.querySelector('.picture__comments').textContent = pic.comments.length;
    clonUserPic.querySelector('.picture__likes').textContent = pic.likes;
    clonUserPic.addEventListener('click', () => {
      openBigPictureMode(pic);
    });
  }
};

const getDataFromServer = () => {
  getData().then((data) => {
    disableFilter();
    createUsersPosts(data);
    initPostsFilter(data);
  });
};

window.addEventListener('load', getDataFromServer);

loadMoreCommentsButtonElement.addEventListener('click', loadComments);
onBigPictureCancelButtonClick.addEventListener('click', closeBigPicture);

export { createUsersPosts };
