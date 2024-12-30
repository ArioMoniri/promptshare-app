require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let(:user) { create(:user) }

  before do
    allow(controller).to receive(:authenticate_user).and_return(true)
    allow(controller).to receive(:current_user).and_return(user)
  end

  describe 'GET #index' do
    it 'returns a successful response' do
      get :index
      expect(response).to be_successful
    end

    it 'returns all users' do
      create_list(:user, 3)
      get :index
      expect(JSON.parse(response.body).size).to eq(4) # 3 created + 1 from let(:user)
    end
  end

  describe 'GET #show' do
    it 'returns a successful response' do
      get :show, params: { id: user.id }
      expect(response).to be_successful
    end

    it 'returns the correct user' do
      get :show, params: { id: user.id }
      expect(JSON.parse(response.body)['id']).to eq(user.id)
    end
  end

  describe 'POST #create' do
    let(:valid_attributes) { attributes_for(:user) }

    it 'creates a new user' do
      expect {
        post :create, params: { user: valid_attributes }
      }.to change(User, :count).by(1)
    end

    it 'returns a successful response' do
      post :create, params: { user: valid_attributes }
      expect(response).to have_http_status(:created)
    end

    it 'returns a token' do
      post :create, params: { user: valid_attributes }
      expect(JSON.parse(response.body)['token']).to be_present
    end
  end

  describe 'PUT #update' do
    let(:new_attributes) { { name: 'New Name' } }

    it 'updates the user' do
      put :update, params: { id: user.id, user: new_attributes }
      user.reload
      expect(user.name).to eq('New Name')
    end

    it 'returns a successful response' do
      put :update, params: { id: user.id, user: new_attributes }
      expect(response).to be_successful
    end
  end

  describe 'DELETE #destroy' do
    it 'destroys the user' do
      user_to_delete = create(:user)
      expect {
        delete :destroy, params: { id: user_to_delete.id }
      }.to change(User, :count).by(-1)
    end

    it 'returns a successful response' do
      delete :destroy, params: { id: user.id }
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'POST #set_openai_api_key' do
    it 'sets the OpenAI API key for the user' do
      post :set_openai_api_key, params: { api_key: 'test_api_key' }
      user.reload
      expect(user.openai_api_key).to eq('test_api_key')
    end

    it 'returns a successful response' do
      post :set_openai_api_key, params: { api_key: 'test_api_key' }
      expect(response).to be_successful
    end
  end

  describe 'DELETE #clear_openai_api_key' do
    before do
      user.set_openai_api_key('test_api_key')
    end

    it 'clears the OpenAI API key for the user' do
      delete :clear_openai_api_key
      user.reload
      expect(user.openai_api_key).to be_nil
    end

    it 'returns a successful response' do
      delete :clear_openai_api_key
      expect(response).to be_successful
    end
  end
end

