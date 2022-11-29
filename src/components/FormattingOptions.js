export const FormattingOptions = ({functions}) => {
    return (
        <fieldset>
            <legend>Formatting Options:</legend>

            <div>
                <input type="radio" id="original" name="formattingOption"
                    value={0}
                    onInput={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="original">Original/None</label>
            </div>

            <div>
                <input type="radio" id="addBullets" name="formattingOption"
                    value={1}
                    onInput={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="addBullets">Add Bullets</label>
            </div>

            <div>
                <input type="radio" id="removeBullets" name="formattingOption"
                    value={2}
                    onInput={(e) => {
                        functions.setSelectedValue(parseInt(e.currentTarget.value))
                    }} />
                <label htmlFor="removeBullets">Remove Bullets</label>
            </div>
        </fieldset>
    )
}