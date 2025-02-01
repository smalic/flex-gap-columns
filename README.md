# Flex gaps for the Columns Gutenberg block

This code allows you to extend the native Gutenberg "Columns" block with the column gap and row gap fields.

Here's what the block extension looks like:
![WP Gutenberg Columns block extension](https://raw.githubusercontent.com/smalic/flex-gap-columns/refs/heads/main/screenshot.png)

We generate the following CSS variables:
```
--column-gap
--column-gap-md
--column-gap-sm

--row-gap
--row-gap-md
--row-gap-sm
```

You can then use these variables to control the `.wp-block-columns` as desired.

Here's what the CSS looks like in action:

```
.wp-block-columns {
    column-gap: var(--column-gap);
    row-gap: var(--row-gap);
}
  
@media (max-width: 1024px) {
    .wp-block-columns {
      column-gap: var(--column-gap-md);
      row-gap: var(--row-gap-md);
    }
}
  
@media (max-width: 768px) {
    .wp-block-columns {
      column-gap: var(--column-gap-sm);
      row-gap: var(--row-gap-sm);
    }
}
```