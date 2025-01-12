import { defineType, defineField, defineArrayMember } from 'sanity';

const postType = defineType({
  title: 'Blog',
  name: 'blog',
  type: 'document',
  fields: [
    defineField({
      name: 'blog_title', 
      type: 'string',
      title: 'Blog Title',
      description: 'title of the post',
      validation: Rule => Rule.required(),
    }), 
    defineField({
      title: 'Blog Description',
      name: 'post_description', 
      type: 'string', 
    }), 
    //slug
    defineField({
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
            source: 'title',
            maxLength: 96
        },
        validation: Rule=>Rule.required()
    }),
    defineField({
        name: 'summary',
        type: 'text',
        title: 'summary',
        validation: Rule=>Rule.required()
    }),
    defineField({
        name: 'image',
        type: 'image',
        title: 'image',
    }),
    defineField({
        name: 'content',
        type: 'array',
        title: 'Content',
        of:[
            defineArrayMember({
                type: 'block'
            })
        ]
    }),
    defineField({
        name: 'author',
        type: 'reference',
        title: 'Author',
        to: [{
            type: 'author'
        }]
    })
  ], 
}); 
export default postType;
