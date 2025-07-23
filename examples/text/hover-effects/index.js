import {
  animate,
  createScope,
  createSpring,
  createDraggable,
  createTimeline,
  stagger,
  text,
  utils,
} from '../../../lib/anime.esm.js';

// Wait until the fonts are all loaded
document.fonts.ready.then(() => {

  createScope({
    root: '#wavy-text-effect',
    defaults: { ease: 'inOut(3)', duration: 350 },
  }).add(({ root }) => {

    const params = {
      split: text.split('h2', { chars: true }),
      strength: 0,
    };

    const waveAnim = createTimeline().add(params.split.chars, {
      y: [`-50%`, `50%`],
      duration: 500,
      loop: true,
      alternate: true,
      ease: 'inOut(2)',
      autoplay: false,
      modifier: v => v * params.strength,
    }, stagger(50)).seek(1000);

    root.addEventListener('pointerenter', () => animate(params, {
      strength: 1,
      onBegin: () => waveAnim.play(),
    }));

    root.addEventListener('pointerleave', () => animate(params, {
      strength: 0,
      onComplete: () => waveAnim.pause(),
    }));

  });

  createScope({
    root: '#slide-up',
  }).add((self) => {

    const { root, methods } = self;

    text.split('h2', {
      chars: {
        class: 'char',
        clone: 'top',
        wrap: 'clip',
      },
    });

    const ease = createSpring({ stiffness: 90, damping: 12 });

    self.add('onEnter', e => {
      createTimeline().add('.char > span', {
        y: '100%',
        composition: 'blend',
        ease,
      }, stagger(10, { use: 'data-char', from: 'random' }));
    });

    self.add('onLeave', e => {
      createTimeline().add('.char > span', {
        y: '0%',
        composition: 'blend',
        ease,
      }, stagger(10, { use: 'data-char', from: 'random' }));
    });

    root.addEventListener('pointerenter', /** @type {EventListener} */(methods.onEnter));
    root.addEventListener('pointerleave', /** @type {EventListener} */(methods.onLeave));

  });

  createScope({
    root: '#light-words',
    defaults: { ease: 'out(3)', duration: 350, composition: 'blend' },
  }).add((self) => {

    const { root, methods } = self;

    const { chars } = text.split('h2', { chars: true });

    utils.set(chars, { opacity: .25 });

    self.add('onEnter', e => {
      createTimeline().add(chars, { opacity: 1 }, stagger(5));
    });

    self.add('onLeave', e => {
      createTimeline().add(chars, { opacity: .25 }, stagger(5));
    });

    root.addEventListener('pointerenter', /** @type {EventListener} */(methods.onEnter));
    root.addEventListener('pointerleave', /** @type {EventListener} */(methods.onLeave));

  });

  createScope({
    root: '#words-3d-jp',
    defaults: {
      ease: 'outQuad',
      duration: 500,
    }
  }).add((self) => {

    const { root, methods } = self;

    text.split('h2', {
      words: `<span class="word-3d" style="position: relative; transform-style: preserve-3d; transform-origin: 50% 0%">
        <span style="transform-origin: 50% 0%; transform: rotateX(0deg)">{value}</span>
        <span style="position: absolute; top: 100%; left: 0; transform-origin: 50% 0%; transform: rotateX(90deg)">{value}</span>
      </span>`,
      lines: false,
      chars: false,
    })

    const wordStagger = stagger(100, { use: 'data-word', start: 0 });

    const rotateAnim = createTimeline({
      autoplay: false,
      defaults: { ease: 'inOutQuad', duration: 400, }
    })
    .add('.word-3d', { rotateX: -90 }, wordStagger)
    .add('.word-3d > span:first-child', { opacity: [1, .25] }, wordStagger)
    .add('.word-3d > span:last-child', { opacity: [.25, 1] }, wordStagger)

    self.add('onEnter', e => {
      animate(rotateAnim, { progress: 1 });
    });

    self.add('onLeave', e => {
      animate(rotateAnim, { progress: 0 });
    });

    root.addEventListener('pointerenter', /** @type {EventListener} */(methods.onEnter));
    root.addEventListener('pointerleave', /** @type {EventListener} */(methods.onLeave));

  });

  createScope({
    root: '#words-slide-x',
    defaults: {
      ease: 'outQuad',
      duration: 500,
    }
  }).add((self) => {

    const { root, methods } = self;

    text.split('h2', {
      chars: {
        class: 'char',
        clone: 'left',
        wrap: 'clip',
      },
    });

    const rotateAnim = createTimeline({
      autoplay: false,
      defaults: { ease: 'inOutQuad', duration: 400, }
    })
    .add('.char > span', { x: '100%' }, stagger(5, { use: 'data-char' }))

    self.add('onEnter', e => {
      animate(rotateAnim, { progress: 1 });
    });

    self.add('onLeave', e => {
      animate(rotateAnim, { progress: 0 });
    });

    root.addEventListener('pointerenter', /** @type {EventListener} */(methods.onEnter));
    root.addEventListener('pointerleave', /** @type {EventListener} */(methods.onLeave));

  });

  createScope({
    root: '#lines-mask',
    defaults: {
      duration: 300,
      composition: 'blend',
    }
  }).add((self) => {

    const { root, methods } = self;

    text.split('p', {
      lines: {
        class: 'line',
        clone: 'top',
        wrap: 'clip',
      },
    });

    utils.set('.line > span:first-child', { color: '#A0A0A0' });

    self.add('onEnter', e => {
      animate('.line > span', { y: '100%', delay: stagger(50) })
    });

    self.add('onLeave', e => {
      animate('.line > span', { y: 0, delay: stagger(50) })
    });

    root.addEventListener('pointerenter', /** @type {EventListener} */(methods.onEnter));
    root.addEventListener('pointerleave', /** @type {EventListener} */(methods.onLeave));

  });

});
