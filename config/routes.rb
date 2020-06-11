Rails.application.routes.draw do

  root to: "pages#root"

  namespace :api, defaults: {format: :json} do
    resources :spellbooks, only: [:create,  :update, :show]
    resources :spells, only: [:create, :update, :show, :destroy]
  end

end
