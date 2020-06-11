
class Api::SpellsController < ApplicationController

    def create
        @spell = Spell.new(spell_params)
        if @spell.save
            render "api/spells/show"
        else
            render json: @spell.errors.full_messages, status: 422
        end
    end

    def show
        @spell = Spell.find_by(id: params[:id])
        if @spell
            render "api/spells/show"
        else
        end
    end

    private

    def spell_params
        params.require(:spell).permit(:name, :range, :level, :verbal, :somatic, :material, :material_desc, :ritual, :conc, :duration, :cast_time, :school, :damage_type, :classes, :desc, :notes)
    end

end