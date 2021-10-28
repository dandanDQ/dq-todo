class Draggable {
  constructor(options) {
    console.log(options, 'options')
    this.parent = options.element; // 父级元素
    this.cloneElementClassName = options.cloneElementClassName; // 克隆元素类名
    this.isPointerdown = false;
    this.diff = { x: 0, y: 0 }; // 相对于上一次移动差值
    this.drag = { element: null, index: 0, lastIndex: 0 }; // 拖拽元素
    this.drop = { element: null, index: 0, lastIndex: 0 }; // 释放元素
    this.clone = { element: null, x: 0, y: 0 };
    this.lastPointermove = { x: 0, y: 0 };
    this.rectList = []; // 用于保存拖拽项getBoundingClientRect()方法获得的数据
    this.draggerClassName = options.draggerClassName
    this.init();
  }
  init() {
      this.getRect();
      this.bindEventListener();
  }
  // 获取元素位置信息
  getRect() {
      this.rectList.length = 0;
      for (const item of this.parent.children) {
        this.rectList.push(item.getBoundingClientRect());
      }
  }
  handlePointerdown(e) {
      // 如果是鼠标点击，只响应左键
      console.log('e', e)
      if (e.pointerType === 'mouse' && e.button !== 0) {
          return;
      }
      if (e.target === this.parent) {
          return;
      }
      if (e.target.className.indexOf(this.draggerClassName) === -1) {
        return;
      }
      const parentNode = e.target.parentNode
      this.isPointerdown = true;
      this.parent.setPointerCapture(e.pointerId);
      this.lastPointermove.x = e.clientX;
      this.lastPointermove.y = e.clientY;
      this.drag.element = parentNode;
      this.drag.element.classList.add('active');
      this.clone.element = this.drag.element.cloneNode(true);
      this.clone.element.className = this.cloneElementClassName;
      this.clone.element.style.transition = 'none';
      const i = [].indexOf.call(this.parent.children, this.drag.element);
      this.clone.x = this.rectList[i].left;
      this.clone.y = this.rectList[i].top;
      this.drag.index = i;
      this.drag.lastIndex = i;
      this.clone.element.style.transform = 'translate3d(' + this.clone.x + 'px, ' + this.clone.y + 'px, 0)';
      document.body.appendChild(this.clone.element);
  }
  handlePointermove(e) {
      if (this.isPointerdown) {
          this.diff.x = e.clientX - this.lastPointermove.x;
          this.diff.y = e.clientY - this.lastPointermove.y;
          this.lastPointermove.x = e.clientX;
          this.lastPointermove.y = e.clientY;
          this.clone.x += this.diff.x;
          this.clone.y += this.diff.y;
          this.clone.element.style.transform = 'translate3d(' + this.clone.x + 'px, ' + this.clone.y + 'px, 0)';
          for (let i = 0; i < this.rectList.length; i++) {
              // 碰撞检测
              if (e.clientX > this.rectList[i].left && e.clientX < this.rectList[i].right &&
                  e.clientY > this.rectList[i].top && e.clientY < this.rectList[i].bottom) {
                  this.drop.element = this.parent.children[i];
                  this.drop.lastIndex = i;
                  if (this.drag.element !== this.drop.element) {
                      if (this.drag.index < i) {
                          this.parent.insertBefore(this.drag.element, this.drop.element.nextElementSibling);
                          this.drop.index = i - 1;
                      } else {
                          this.parent.insertBefore(this.drag.element, this.drop.element);
                          this.drop.index = i + 1;
                      }
                      this.drag.index = i;
                      const dragRect = this.rectList[this.drag.index];
                      const lastDragRect = this.rectList[this.drag.lastIndex];
                      const dropRect = this.rectList[this.drop.index];
                      const lastDropRect = this.rectList[this.drop.lastIndex];
                      this.drag.lastIndex = i;
                      this.drag.element.style.transition = 'none';
                      this.drop.element.style.transition = 'none';
                      this.drag.element.style.transform = 'translate3d(' + (lastDragRect.left - dragRect.left) + 'px, ' + (lastDragRect.top - dragRect.top) + 'px, 0)';
                      this.drop.element.style.transform = 'translate3d(' + (lastDropRect.left - dropRect.left) + 'px, ' + (lastDropRect.top - dropRect.top) + 'px, 0)';
                      this.drag.element.offsetLeft; // 触发重绘
                      this.drag.element.style.transition = 'transform 150ms';
                      this.drop.element.style.transition = 'transform 150ms';
                      this.drag.element.style.transform = 'translate3d(0px, 0px, 0px)';
                      this.drop.element.style.transform = 'translate3d(0px, 0px, 0px)';
                  }
                  break;
              }
          }
      }
  }
  handlePointerup() {
      if (this.isPointerdown) {
          this.isPointerdown = false;
          this.drag.element.classList.remove('active');
          this.clone.element.remove();
      }
  }
  handlePointercancel() {
      if (this.isPointerdown) {
          this.isPointerdown = false;
          this.drag.element.classList.remove('active');
          this.clone.element.remove();
      }
  }
  bindEventListener() {
      this.handlePointerdown = this.handlePointerdown.bind(this);
      this.handlePointermove = this.handlePointermove.bind(this);
      this.handlePointerup = this.handlePointerup.bind(this);
      this.handlePointercancel = this.handlePointercancel.bind(this);
      this.getRect = this.getRect.bind(this);
      this.parent.addEventListener('pointerdown', this.handlePointerdown);
      this.parent.addEventListener('pointermove', this.handlePointermove);
      this.parent.addEventListener('pointerup', this.handlePointerup);
      this.parent.addEventListener('pointercancel', this.handlePointercancel);
      window.addEventListener('scroll', this.getRect);
      window.addEventListener('resize', this.getRect);
      window.addEventListener('orientationchange', this.getRect);
  }
  unbindEventListener() {
      this.parent.removeEventListener('pointerdown', this.handlePointerdown);
      this.parent.removeEventListener('pointermove', this.handlePointermove);
      this.parent.removeEventListener('pointerup', this.handlePointerup);
      this.parent.removeEventListener('pointercancel', this.handlePointercancel);
      window.removeEventListener('scroll', this.getRect);
      window.removeEventListener('resize', this.getRect);
      window.removeEventListener('orientationchange', this.getRect);
  }
}

export default Draggable;

