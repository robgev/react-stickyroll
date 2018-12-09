import {Frame as StickyFrame, hashClassNames} from "@stickyroll/frame";
import {mount, initDOM} from "@stickyroll/testing-utils";
import {classNames} from "@stickyroll/utils";
import test from "ava";
import React from "react";
import {renderToString} from "react-dom/server";

initDOM();

const DEFAULT_OPTIONS = {
	anchors: "",
	className: "",
	content: "",
	factor: 1,
	pages: 1
};

const createMarkup = ({
	anchors = DEFAULT_OPTIONS.anchors,
	className = DEFAULT_OPTIONS.className,
	content = DEFAULT_OPTIONS.content,
	factor = DEFAULT_OPTIONS.factor,
	pages = DEFAULT_OPTIONS.pages
} = DEFAULT_OPTIONS) =>
	`<div class="${classNames(hashClassNames.wrapper, className)}" `
	+ `style="height:${100 + 100 * factor * pages}vh">${anchors}<div class="${hashClassNames.overlay}">${content}</div></div>`;

const createAnchors = (
	prefix = "",
	pages = DEFAULT_OPTIONS.pages,
	factor = DEFAULT_OPTIONS.factor
) =>
	`<div class="${hashClassNames.targets}">${Array(pages)
		.fill(Boolean)
		.map(
			(x, i) =>
				`<span id="${prefix}${prefix === "" ? "" : "/"}${i +
					1}" class="${hashClassNames.target}" style="height:${100 * factor}vh"></span>`
		)
		.join("")}<span id="${prefix}${
		prefix === "" ? "" : "/"
		}${pages + 1}" class="${hashClassNames.target}"></span><span id="${prefix}${
		prefix === "" ? "" : "/"
		}skip" class="${hashClassNames.skip}"></span></div>`;

test("Renders the correct markup ", t => {
	const expected = createMarkup();
	const actual = renderToString(<StickyFrame pages={1} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (2 pages)", t => {
	const pages = 2;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
	t.is(expected, actual);
});

test("Renders the correct height (10 pages)", t => {
	const pages = 10;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
	t.is(expected, actual);
});

test("Allow adding anchor targets", t => {
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors="" />);
	const expected = createMarkup({anchors: createAnchors()});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with ""', t => {
	const anchors = "";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "example"', t => {
	const anchors = "example";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "!"', t => {
	const anchors = "!";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test('Allow defining anchor prefix with "!/example"', t => {
	const anchors = "!/example";
	const actual = renderToString(<StickyFrame pages={1} render={() => null} anchors={anchors} />);
	const expected = createMarkup({anchors: createAnchors(anchors)});
	t.is(expected, actual);
});

test("Render the correct amount of anchors", t => {
	const pages = 3;
	const anchors = "!/example";
	const expected = createMarkup({pages, anchors: createAnchors(anchors, pages)});
	const actual = renderToString(
		<StickyFrame pages={pages} render={() => null} anchors={anchors} />
	);
	t.is(expected, actual);
});

test("Render the factor correctly", t => {
	const pages = 10;
	const expected = createMarkup({pages});
	const actual = renderToString(<StickyFrame pages={pages} render={() => null} />);
	t.is(expected, actual);
});

test("Renders children when passed in", t => {
	const wrapper = mount(
		<StickyFrame className="🌈" pages={1} render={() => <div className="unique" />} />
	);
	t.true(wrapper.contains(<div className="unique" />));
});

test("Allows adding classNames", t => {
	const wrapper = mount(<StickyFrame className="🌈" pages={1} render={() => null} />);
	t.true(wrapper.hasClass("🌈"));
});
