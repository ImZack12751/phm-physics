// Lets chapters write site-absolute links like [SI units](/part-0/si-units/) and have them
// work when the site is served from a sub-path such as https://user.github.io/phm-physics/.
import { visit } from 'unist-util-visit';

export default function rehypeBaseLinks({ base = '/' } = {}) {
	const prefix = base.replace(/\/$/, '');
	return (tree) => {
		if (!prefix) return;
		visit(tree, 'element', (node) => {
			for (const attr of ['href', 'src']) {
				const v = node.properties?.[attr];
				if (typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(prefix + '/')) {
					node.properties[attr] = prefix + v;
				}
			}
		});
	};
}
