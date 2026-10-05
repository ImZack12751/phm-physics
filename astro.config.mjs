// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { COURSE_NAME, SITE, BASE, GITHUB_USER, REPO_NAME } from './course.config.mjs';
import { parts } from './src/data/curriculum.mjs';
import rehypeBaseLinks from './src/plugins/rehype-base-links.mjs';
import rawMarkdown from './src/integrations/raw-markdown.mjs';

// Sidebar: a "Course" group, then one group per Part that has at least one published chapter.
const partGroups = parts
	.map((part) => ({
		label: part.label,
		items: part.chapters
			.map((ch, i) => ({ ...ch, number: `${part.code}.${i + 1}` }))
			.filter((ch) => ch.status !== 'planned')
			.map((ch) => ({ label: `${ch.number}  ${ch.title}`, slug: `${part.dir}/${ch.slug}` })),
	}))
	.filter((g) => g.items.length > 0);

export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'always',
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath],
			rehypePlugins: [
				[rehypeKatex, { strict: 'warn', throwOnError: false, output: 'htmlAndMathml' }],
				[rehypeBaseLinks, { base: BASE }],
			],
		}),
	},
	integrations: [
		starlight({
			title: COURSE_NAME,
			description:
				'A free course that teaches physics from zero, using the science of Andy Weir’s novel Project Hail Mary.',
			favicon: '/favicon.svg',
			social: [
				{ icon: 'github', label: 'Source on GitHub', href: `https://github.com/${GITHUB_USER}/${REPO_NAME}` },
			],
			tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 3 },
			logo: { src: './src/assets/logo.svg', alt: '' },
			customCss: [
				'@fontsource-variable/inter',
				'@fontsource-variable/space-grotesk',
				'@fontsource-variable/jetbrains-mono',
				'katex/dist/katex.min.css',
				'./src/styles/theme.css',
				'./src/styles/components.css',
				'./src/styles/space.css',
				'./src/styles/print.css',
			],
			components: {
				ThemeProvider: './src/components/overrides/ThemeProvider.astro',
				Sidebar: './src/components/overrides/Sidebar.astro',
				MarkdownContent: './src/components/overrides/MarkdownContent.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
				Hero: './src/components/overrides/Hero.astro',
				SkipLink: './src/components/overrides/SkipLink.astro',
			},
			sidebar: [
				{
					label: 'Course',
					items: [
						{ label: 'Start here', slug: 'start-here' },
						{ label: 'Physics map', slug: 'physics-map' },
						{ label: 'Glossary', slug: 'glossary' },
						{ label: 'Formula sheet', slug: 'formulas' },
					],
				},
				...partGroups,
			],
		}),
		rawMarkdown(),
	],
});
