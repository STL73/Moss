import '@testing-library/jest-dom';

// jsdom implements no IntersectionObserver, and Motion's whileInView constructs
// one on mount. Without this, every test that renders a Reveal throws before it
// asserts anything.
//
// It is deliberately inert: it never reports an intersection, so a reveal in a
// test stays in its initial state. That is the right default — a test asserting
// that content is present should not depend on a scroll position jsdom does not
// have. Motion still renders the children either way, which is what the tests
// check.
class IntersectionObserverStub {
    constructor(callback) {
        this.callback = callback;
    }

    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return [];
    }
}

globalThis.IntersectionObserver = IntersectionObserverStub;
