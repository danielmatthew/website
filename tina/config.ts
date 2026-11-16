import { defineConfig } from "tinacms";
import { CATEGORIES } from "../src/lib/taxonomy";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "publishedDate",
            label: "Date posted",
            required: true,
          },
          {
            type: "boolean",
            name: "published",
            label: "Published",
            ui: {
              defaultValue: true,
            },
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: [...CATEGORIES],
            ui: {
              defaultValue: "note",
            },
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "string",
            name: "link",
            label: "External link",
            description: "For link posts: the URL being shared",
          },
          {
            type: "boolean",
            name: "syndicate",
            label: "Syndicate to Mastodon/Bluesky",
            ui: {
              defaultValue: true,
            },
          },
          {
            type: "boolean",
            name: "evergreen",
            label: "Evergreen",
            description: "Content that doesn't date; hides the age notice",
          },
          {
            type: "boolean",
            name: "featured",
            label: "Featured",
            description: "Show on the homepage",
          },
          {
            type: "boolean",
            name: "pinned",
            label: "Pinned",
            description: "Keep at the top of the notes list",
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "Last modified",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
