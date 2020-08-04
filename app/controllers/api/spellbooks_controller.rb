
class Api::SpellbooksController < ApplicationController

    def create
        @spellbook = Spellbook.new(spellbook_params)
        @spellbook.initialize_data
        if @spellbook.save
            render "api/spellbooks/show"
        else
            render json: @spellbook.errors.full_messages, status: 422
        end
    end

    def update
        if (spellbook_params[:url] == "srd")
            render json: {
                error: "SRD Spellbook may not be modified."
            }, status: 403
        else
            @spellbook = Spellbook.find_by_url(spellbook_params[:url])
            if @spellbook.update(spellbook_params)
                render "api/spellbooks/show"
            else
                render json: @spellbook.errors.full_messages, status: 422
            end
        end
    end

    def show
        @spellbook = Spellbook.find_by_url(spellbook_params[:url])
        if @spellbook
            render "api/spellbooks/show"
        else
        end
    end

    private

    def spellbook_params
        params.require(:spellbook).permit(:id, :name, :url, :spells, :classes)
    end

end