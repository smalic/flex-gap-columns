const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment } = wp.element;
const { InspectorControls } = wp.editor;
const { createHigherOrderComponent } = wp.compose;
const {
  RangeControl,
  PanelBody,
  __experimentalNumberControl: NumberControl,
} = wp.components;

const allowedBlocks = ["core/columns"];

const addAttributes = (settings) => {
  if (
    typeof settings.attributes === "undefined" ||
    !allowedBlocks.includes(settings.name)
  ) {
    return settings;
  }

  settings.attributes = {
    ...settings.attributes,
    columnGap: {
      type: "object",
      default: {
        desktop: 0,
        tablet: 0,
        mobile: 0,
      },
    },
    rowGap: {
      type: "object",
      default: {
        desktop: 0,
        tablet: 0,
        mobile: 0,
      },
    },
  };

  return settings;
};

const withAdvancedControls = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const { name, attributes, setAttributes, isSelected } = props;
    const { columnGap, rowGap } = attributes;

    return (
      <>
        <BlockEdit {...props} />

        {isSelected && allowedBlocks.includes(name) && (
          <>
            <InspectorControls>
              <PanelBody
                title={__("Additional Flex Options")}
                initialOpen={true}
              >
                <RangeControl
                  label={__("Column Gap")}
                  value={columnGap.desktop || 0}
                  onChange={(value) =>
                    setAttributes({
                      columnGap: { ...columnGap, desktop: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"desktop"}
                />

                <RangeControl
                  value={columnGap.tablet || 0}
                  onChange={(value) =>
                    setAttributes({
                      columnGap: { ...columnGap, tablet: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"tablet"}
                />

                <RangeControl
                  value={columnGap.mobile || 0}
                  onChange={(value) =>
                    setAttributes({
                      columnGap: { ...columnGap, mobile: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"smartphone"}
                />

                <RangeControl
                  label={__("Row Gap")}
                  value={rowGap.desktop || 0}
                  onChange={(value) =>
                    setAttributes({
                      rowGap: { ...rowGap, desktop: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"desktop"}
                />

                <RangeControl
                  value={rowGap.tablet || 0}
                  onChange={(value) =>
                    setAttributes({
                      rowGap: { ...rowGap, tablet: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"tablet"}
                />

                <RangeControl
                  value={rowGap.mobile || 0}
                  onChange={(value) =>
                    setAttributes({
                      rowGap: { ...rowGap, mobile: Number(value) },
                    })
                  }
                  min={0}
                  max={200}
                  beforeIcon={"smartphone"}
                />
              </PanelBody>
            </InspectorControls>
          </>
        )}
      </>
    );
  };
}, "withAdvancedControls");

const addSaveProps = (extraProps, blockType, attributes) => {
  if (!allowedBlocks.includes(blockType.name)) {
    return extraProps;
  }

  const { columnGap, rowGap } = attributes;

  extraProps.style = {
    ...extraProps.style,
    "--column-gap": `${columnGap.desktop || 0}px`,
    "--column-gap-md": `${columnGap.tablet || 0}px`,
    "--column-gap-sm": `${columnGap.mobile || 0}px`,
    "--row-gap": `${rowGap.desktop}px`,
    "--row-gap-md": `${rowGap.tablet}px`,
    "--row-gap-sm": `${rowGap.mobile}px`,
  };

  return extraProps;
};

addFilter(
  "blocks.registerBlockType",
  "smalic/custom-attributes",
  addAttributes
);

addFilter(
  "editor.BlockEdit",
  "smalic/custom-advanced-control",
  withAdvancedControls
);

addFilter(
  "blocks.getSaveContent.extraProps",
  "smalic/add-save-props",
  addSaveProps
);
