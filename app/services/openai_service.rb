require 'openai'

class OpenaiService
  def initialize(api_key)
    @client = OpenAI::Client.new(access_token: api_key)
  end

  def test_prompt(prompt, model = "gpt-3.5-turbo")
    response = @client.chat(
      parameters: {
        model: model,
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }
    )
    response.dig("choices", 0, "message", "content")
  end
end

