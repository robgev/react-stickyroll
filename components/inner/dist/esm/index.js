import styled, { css } from 'styled-components';

/**
 * This component can be used to add a themed inner wrapper. This is especially helpful when using
 * nested stickyroll components (e.g. Pagers).
 *
 * The theme is inherited and can therefore be used in other components. This mechanism relies on
 * styled-components `ThemeProvider`
 * ### Usage:
 * ```jsx
 * import {Frame} from "@stickyroll/frame";
 * import {Inner} from "@stickyroll/inner";
 * const App = () => (
 *   <Frame pages={1}>
 *       {() => <Inner/>}
 *   </Frame>
 * )
 * ```
 * ---
 * @type {StyledComponent<"section", IInnerTheme, IInnerProps>}
 * @param {IInnerProps} props
 * @param {IInnerTheme} [props.theme]
 * @param {boolean} [props.withPagers]
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
const Inner = styled.section `
	${(props) => css `
		--pager-size: ${props.theme.pagerSize};
		--pager-gap: ${props.theme.pagerGap};
		--marker-size: ${props.theme.markerSize};
		--background-h: ${props.theme.hue};
		--background-s: ${props.theme.saturation};
		--background-l: ${props.theme.lightness};
		--background-color: hsla(var(--background-h), var(--background-s), var(--background-l), 1);
		--stroke-color: ${props.theme.color};
		--stroke-width: ${props.theme.strokeWidth};
		--font-default: ${props.theme.color};
		padding: 1rem 1rem 2rem ${props.withPagers ? "calc(var(--pager-size) + 2rem)" : "1rem"};
		color: ${props.theme.color};
	`};
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	background-color: var(--background-color);
`;
Inner.defaultProps = {
    theme: {
        color: "white",
        hue: 0,
        lightness: "10%",
        markerSize: "1.5rem",
        pagerGap: "2rem",
        pagerSize: "1.5rem",
        saturation: "0%",
        strokeWidth: "2px"
    }
};

//# sourceMappingURL=index.js.map

export { Inner };