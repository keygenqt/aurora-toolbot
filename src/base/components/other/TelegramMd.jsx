import PropTypes from 'prop-types';
import rehypeRaw from 'rehype-raw';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import emoji from 'remark-emoji';
import Markdown from 'react-markdown';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useEffectTheme } from '../../../base'
import { useTheme, Box } from '@mui/material';

export function TelegramMd(props) {
    const theme = useTheme();
    const themeMode = useEffectTheme();
    return (
        <Box
            sx={{
                borderRadius: 2,
                paddingY: 2,
                paddingX: 2,
                backgroundColor: 'background.default',
                overflowY: 'auto',
                fontSize: '14px',
                lineHeight: '18px',
                border: `1px solid ${theme.palette.info.main}1f`,
                '& > p:first-child': {
                    marginTop: 0
                },
                '& > p:last-child': {
                    marginBottom: 0
                },
                '& a': {
                    color: theme.palette.info.main
                },
                '& ol, & ul': {
                    paddingLeft: 3,
                },
                '& blockquote': {
                    borderRadius: 2,
                    background: theme.palette.info.light,
                    padding: 2,
                    marginLeft: 0,
                    marginRight: 0,
                },
                '& blockquote p': {
                    padding: 0,
                    margin: 0,
                },
                '& :not(pre) code': {
                    borderRadius: 1,
                    background: theme.palette.inherit.light,
                    paddingLeft: 0.5,
                    paddingRight: 0.5,
                },
                '& .SyntaxHighlighter': {
                    borderRadius: '8px !important',
                }
            }}
        >
            <Markdown
                remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
                rehypePlugins={[
                    rehypeRaw,
                    [rehypeExternalLinks, { target: '_blank' }],
                    emoji
                ]}
                components={{
                    code(props) {
                        const { children, className, node, ...rest } = props
                        const match = /language-(\w+)/.exec(className || '')
                        return match ? (
                            <SyntaxHighlighter
                                {...rest}
                                PreTag={'div'}
                                className={'SyntaxHighlighter'}
                                children={String(children).replace(/\n$/, '')}
                                language={match[1]}
                                style={themeMode == 'dark' ? oneLight : oneDark}
                            />
                        ) : (
                            <code {...rest} className={className}>
                                {children}
                            </code>
                        )
                    }
                }}
            >
                {props.children}
            </Markdown>
        </Box>
    );
}

TelegramMd.propTypes = {
    children: PropTypes.string.isRequired,
};
