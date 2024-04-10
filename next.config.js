/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/:path*`
      },
      // BFF = Backend For Frontend
      {
        source: '/bff/:path*',
        destination: `${process.env.NEXT_PUBLIC_BFF_API_URL}/:path*`
      },
      {
        source: '/dashboard',
        destination: '/dashboard/events'
      }
    ]
  },
  reactStrictMode: true,
  transpilePackages: [
    "@adobe/react-spectrum",
    "@react-spectrum/toast",
    "@react-spectrum/actionbar",
    "@react-spectrum/avatar",
    "@react-spectrum/dropzone",
    "@react-spectrum/inlinealert",
    "@react-spectrum/tag",
    "@react-spectrum/actiongroup",
    "@react-spectrum/badge",
    "@react-spectrum/breadcrumbs",
    "@react-spectrum/button",
    "@react-spectrum/buttongroup",
    "@react-spectrum/calendar",
    "@react-spectrum/checkbox",
    "@react-spectrum/color",
    "@react-spectrum/combobox",
    "@react-spectrum/contextualhelp",
    "@react-spectrum/datepicker",
    "@react-spectrum/dialog",
    "@react-spectrum/divider",
    "@react-spectrum/dnd",
    "@react-spectrum/form",
    "@react-spectrum/icon",
    "@react-spectrum/illustratedmessage",
    "@react-spectrum/image",
    "@react-spectrum/label",
    "@react-spectrum/labeledvalue",
    "@react-spectrum/layout",
    "@react-spectrum/link",
    "@react-spectrum/list",
    "@react-spectrum/listbox",
    "@react-spectrum/menu",
    "@react-spectrum/meter",
    "@react-spectrum/numberfield",
    "@react-spectrum/overlays",
    "@react-spectrum/picker",
    "@react-spectrum/progress",
    "@react-spectrum/provider",
    "@react-spectrum/radio",
    "@react-spectrum/slider",
    "@react-spectrum/searchfield",
    "@react-spectrum/statuslight",
    "@react-spectrum/switch",
    "@react-spectrum/table",
    "@react-spectrum/tabs",
    "@react-spectrum/text",
    "@react-spectrum/textfield",
    "@react-spectrum/theme-dark",
    "@react-spectrum/theme-default",
    "@react-spectrum/theme-light",
    "@react-spectrum/tooltip",
    "@react-spectrum/view",
    "@react-spectrum/well",
    "@spectrum-icons/illustrations",
    "@spectrum-icons/ui",
    "@spectrum-icons/workflow",
  ],
}

module.exports = nextConfig
