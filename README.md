# PromptShare

PromptShare is a modern web platform for sharing, discovering, and collaborating on AI prompts. It allows users to create, share, and iterate on prompts while engaging with the community through features like comments, ratings, and collaborative improvements.

## Features

- 🚀 **Prompt Management**

- Create and share AI prompts
- Version control for prompt iterations
- Rich text editing support
- Categories and tags for organization



- 👥 **Community Interaction**

- Like/dislike prompts
- Comment on prompts
- Star prompts for later reference
- Fork prompts to create variations
- Report issues and suggest improvements



- 🔍 **Discovery**

- Browse latest prompts
- Explore trending prompts
- Search by keywords, categories, or tags
- Filter by popularity and date



- 👤 **User Features**

- User profiles and dashboards
- Activity feed
- OpenAI API key management for testing prompts
- Dark/light mode support





## Tech Stack

### Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React icons


### Backend

- Ruby on Rails 7
- PostgreSQL
- JWT authentication
- Active Storage
- Sidekiq for background jobs


## Getting Started

### Prerequisites

- Node.js 18+
- Ruby 3.2.2
- PostgreSQL
- Redis (for Sidekiq)


### Frontend Setup

1. Clone the repository:

```shellscript
git clone https://github.com/yourusername/promptshare.git
cd promptshare
```


2. Install dependencies:

```shellscript
yarn install
```


3. Create a `.env.local` file:

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```


4. Start the development server:

```shellscript
yarn dev
```




### Backend Setup

1. Navigate to the backend directory:

```shellscript
cd backend
```


2. Install dependencies:

```shellscript
bundle install
```


3. Set up the database:

```shellscript
rails db:create db:schema:load db:seed
```


4. Start the Rails server:

```shellscript
rails server
```


5. In a separate terminal, start Sidekiq:

```shellscript
bundle exec sidekiq
```




## Environment Variables

### Frontend

- `NEXT_PUBLIC_API_URL`: Backend API URL


### Backend

- `DATABASE_URL`: PostgreSQL connection URL
- `REDIS_URL`: Redis connection URL
- `JWT_SECRET`: Secret key for JWT tokens
- `ENCRYPTION_KEY`: Key for encrypting sensitive data
- `GMAIL_USERNAME`: Email service username
- `GMAIL_PASSWORD`: Email service password


## API Documentation

API documentation is available at `/api/docs` when running the backend server in development mode.

### Key Endpoints

- `POST /api/v1/login`: User authentication
- `POST /api/v1/users`: User registration
- `GET /api/v1/prompts`: List prompts
- `POST /api/v1/prompts`: Create prompt
- `GET /api/v1/prompts/:id`: Get prompt details
- `PUT /api/v1/prompts/:id`: Update prompt
- `DELETE /api/v1/prompts/:id`: Delete prompt
- `POST /api/v1/prompts/:id/fork`: Fork prompt
- `POST /api/v1/prompts/:id/star`: Star prompt
- `POST /api/v1/prompts/:id/like`: Like prompt
- `POST /api/v1/prompts/:id/issues`: Create issue


## Testing

### Frontend Tests

```shellscript
yarn test
```

### Backend Tests

```shellscript
bundle exec rspec
```

## Deployment

The project uses GitHub Actions for CI/CD:

- Frontend is deployed to Vercel
- Backend is deployed to Heroku
- Automated tests run on every pull request
- Automatic deployments on merges to main


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


Please make sure to update tests as appropriate and follow the existing code style.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icons
- All contributors who have helped shape this project


## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

---

Built with ❤️ by the PromptShare Team
