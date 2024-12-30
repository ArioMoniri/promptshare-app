require 'rails_helper'

RSpec.describe Api::V1::PromptsController, type: :controller do
  let(:user) { create(:user) }
  let(:prompt) { create(:prompt, user: user) }

  before do
    allow(controller).to receive(:authenticate_user).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end

    it 'returns all prompts' do
      create_list(:prompt, 3)
      get :index
      expect(JSON.parse(response.body).size).to eq(3)
    end
  end

  describe 'GET #show' do
    it 'returns a successful response' do
      get :show, params: { id: prompt.id }
      expect(response).to be_successful
    end

    it 'returns the correct prompt' do
      get :show, params: { id: prompt.id }
      expect(JSON.parse(response.body)['id']).to eq(prompt.id)
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) { attributes_for(:prompt) }

    it 'creates a new prompt' do
      expect {
        post :create, params: { prompt: valid_attributes }
      }.to change(Prompt, :count).by(1)
    end

    it 'returns a successful response' do
      post :create, params: { prompt: valid_attributes }
      expect(response).to have_http_status(:created)
    end
  end

  describe 'PUT #update' do
    let(:new_attributes) { { title: 'Updated Title' } }

    it 'updates the prompt' do
      put :update, params: { id: prompt.id, prompt: new_attributes }
      prompt.reload
      expect(prompt.title).to eq('Updated Title')
    end

    it 'returns a successful response' do
      put :update, params: { id: prompt.id, prompt: new_attributes }
      expect(response).to be_successful
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the prompt' do
      prompt_to_delete = create(:prompt, user: user)
      expect {
        delete :destroy, params: { id: prompt_to_delete.id }
      }.to change(Prompt, :count).by(-1)
    end

    it 'returns a successful response' do
      delete :destroy, params: { id: prompt.id }
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'POST #fork' do
    it 'creates a forked prompt' do
      expect {
        post :fork, params: { id: prompt.id }
      }.to change(Prompt, :count).by(1)
    end

    it 'returns a successful response' do
      post :fork, params: { id: prompt.id }
      expect(response).to have_http_status(:created)
    end
  end

  describe 'POST #create_version' do
    let(:version_attributes) { { content: 'New version content', change_log: 'Updated prompt' } }

    it 'creates a new version for the prompt' do
      expect {
        post :create_version, params: { id: prompt.id, version: version_attributes }
      }.to change(Version, :count).by(1)
    end

    it 'returns a successful response' do
      post :create_version, params: { id: prompt.id, version: version_attributes }
      expect(response).to have_http_status(:created)
    end
  end

  describe 'GET #trending' do
    it 'returns a successful response' do
      get :trending
      expect(response).to be_successful
    end

    it 'returns trending prompts' do
      create_list(:prompt, 3)
      get :trending
      expect(JSON.parse(response.body)).to be_an(Array)
    end
  end

  describe 'GET #search' do
    it 'returns a successful response' do
      get :search, params: { query: 'test' }
      expect(response).to be_successful
    end

    it 'returns matching prompts' do
      create(:prompt, title: 'Test Prompt')
      create(:prompt, title: 'Another Prompt')
      get :search, params: { query: 'Test' }
      expect(JSON.parse(response.body).size).to eq(1)
    end
  end
end

