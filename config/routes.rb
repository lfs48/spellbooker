Rails.application.routes.draw do

  root to: "pages#root"

  namespace :api, defaults: {format: :json} do
    resource :spellbooks, only: [:create,  :update, :show]
  end

end
