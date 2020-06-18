
class Api::SpellbooksController < ApplicationController

    def create
        @spellbook = Spellbook.new(spellbook_params)
        if @spellbook.save
            render "api/spellbooks/show"
        else
            render json: @spellbook.errors.full_messages, status: 422
        end
    end

    def show
        @spellbook = Spellbook.find_by(url: spellbook_params[:url])
        if @spellbook
            render "api/spellbooks/show"
        else
        end
    end

    private

    def spellbook_params
        params.require(:spellbook).permit(:name, :url, :desc)
    end

end