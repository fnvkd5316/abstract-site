class Site {
  constructor() {
    this.boards = [];
  }

  addBoard(board) {
    if (this.findBoardByName(board.name)) {
      throw Error('board이름 중복');
    }

    board.added = true;
    this.boards.push(board);
  }

  findBoardByName(boardName) {
    return this.boards.find((board) => board.name === boardName);
  }
}

class Board {
  constructor(boardName) {
    if (boardName === '' || boardName === null) {
      throw Error('허용되지 않는 boardName');
    }

    this.name = boardName;
    this.added = false;
    this.articles = [];
  }

  publish(article) {
    if (this.added === false) {
      throw Error('등록되지 않은 board 입니다.');
    }

    article.id = `${this.name}-${new Date()}}`;
    this.articles.push(article);
  }

  getAllArticles() {
    return this.articles;
  }
}

class Article {
  constructor(info) {
    if (!info['subject'] || !info['content'] || !info['author']) {
      throw Error();
    }

    Object.values(info).forEach((a)=> {
      if ( a === '' || a === null) {
        throw Error();
      }
    });

    this.subject = info['subject'];
    this.content = info['content'];
    this.author = info['author'];
    this.id = null;
    this.createdDate = new Date().toISOString();
    this.comments = [];
  }

  reply(comment) {
    if (this.id === null) {
      throw Error('등록되지 않은 article 입니다.');
    }

    this.comments.push(comment);
  }

  getAllComments() {
    return this.comments;
  }
}

class Comment {
  constructor(info) {
    // if ( !info['content'] || !info['author'] ) {
    //   throw Error();
    // }

    // Object.values(info).forEach((a, idx, array)=> {
    //   if (a === '' || a === null) {
    //     throw Error();
    //   }
    // });

    this.content = info['content'];
    this.author = info['author'];
    this.createdDate = new Date().toISOString();
  }

  set content(text) {
    if(!text || text === '' || text === null){
      throw new Error();
    }
    this._content = text;
  }

  set author(text) {
    if(!text || text === '' || text === null){
      throw new Error();
    }
    this._author = text;
  }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
